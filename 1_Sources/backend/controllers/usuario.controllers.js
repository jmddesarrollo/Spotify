'use strict'

var Sequelize = require('sequelize');

// Encriptación
var bcrypt = require('bcrypt-nodejs');

// Cargar servicio jwt
var jwt = require('../services/jwt');

// File System. Recoger ficheros
var fs = require('fs');

// Para trabajar con los directorios de los archivos
var path = require('path');


// Cargar modelos
var db = require("../models");
var Usuario = db.usuario;

// Operandos
var Op = Sequelize.Op;

/*
 * Consultar todos los usuarios.
 */
function getUsuarios(req, res) {
    Usuario.findAll()
        .then(function (usuarios) {
            if (!usuarios) {
                res.status(404).send({ mensaje: "No se ha encontrado usuarios." });
            } else {
                res.status(200).send({ usuarios });
            }
        })
        .catch(function (error) {
            console.log("Error producido en getUsuarios: " + error);
            res.status(500).send({ mensaje: "Error al recuperar datos de los usuarios.", error: error });
        });
}

/*
 * Añadir nueva estructura empresa
 */
function nuevoUsuario(req, res) {
    var contrasenha = '';

    var params = req.body;

    Usuario.find({
        where: { email: params.email }
    })
        .then(function (usuario) {
            if (usuario) {
                res.status(500).send({ mensaje: 'Error: El usuario ya existe.' });
            } else {
                if (params.contrasenha) {
                    bcrypt.hash(params.contrasenha, null, null, function (err, hash) {
                        Usuario.create({
                            nombre: params.nombre,
                            apellidos: params.apellidos,
                            email: params.email,
                            contrasenha: hash,
                            rol: 'usuario',
                            imagen: null
                        }).then(function (usuario) {
                            res.status(200).send({ usuario });
                        }).catch(function (error) {
                            console.log("Error producido usuario: saveUsuario " + error);
                            res.status(500).send({ mensaje: "Se ha producido un error al añadir un usuario.", error: error });
                        });
                    });

                } else {
                    res.status(500).send({ mensaje: 'Se necesita contraseña.' });
                }
            }
        })
        .catch(function (error) {
            console.log("Error producido en loginUsuario: " + error);
            res.status(500).send({ mensaje: "Error al recuperar datos del usuario.", error: error });
        });
}

function loginUsuario(req, res) {
    var params = req.body;

    var email = params.email;
    var contrasenha = params.contrasenha;

    Usuario.find({
        where: { email: email }
    })
    .then(function (usuario) {
        if (usuario) {
            bcrypt.compare(contrasenha, usuario.contrasenha, function (err, check) {
                if (check) {
                    // Devolver los datos del usuario logueado
                    if (params.gethash) {
                        // Devolver un token de jwt
                        res.status(200).send({ token: jwt.createToken(usuario) });
                    } else {
                        res.status(200).send({ usuario });
                    }                    
                } else {
                    console.log(check);
                    res.status(404).send({ mensaje: "La contraseña es incorrecta.", error: err });
                }
            });
            
        } else {
            res.status(404).send({ mensaje: "No se ha encontrado ningún usuario con ese email." });
        }
    })
    .catch(function (error) {
        console.log("Error producido en loginUsuario: " + error);
        res.status(500).send({ mensaje: "Error al recuperar datos del usuario.", error: error });
    });
}

function editUsuario(req, res) {
    var usuarioId = req.params.id;
    var params = req.body;

    // Comprobar si el usuario a modificar es distinto del usuario conectado
    if (usuarioId != req.usuario.sub) {
        return res.status(500).send({ mensaje: "No tienes permiso para modificar este usuario." });
    } 

    Usuario.findById(usuarioId)
        .then(function (usuario) {
            if (usuario) {
                if (params.contrasenha) {
                    bcrypt.hash(params.contrasenha, null, null, function (err, hash) {
                        console.log('contra');
                        usuario.contrasenha = hash;

                        if (params.nombre != usuario.nombre) {
                            usuario.nombre = params.nombre;
                        }
                        if (params.apellidos != usuario.apellidos) {
                            usuario.apellidos = params.apellidos;
                        }
                        if (params.email != usuario.email) {
                            usuario.email = params.email;                           
                        }
                        if (params.rol != usuario.rol) {
                            usuario.rol = params.rol;
                        }
                        if (params.imagen != usuario.imagen) {
                            usuario.imagen = params.imagen;
                        }
                        // save recibe una función callback, con el posible error y el objeto que guarda.
                        usuario.save()
                            .then(function (usuario) {
                                res.status(200).send({ usuario });
                            })
                            .catch(function (error) {
                                console.log("Error producido en editUsuario: " + error);
                                res.status(500).send({ mensaje: "Error al editar usuario. Seguramente el email ya esté dado de alta.", error: error });
                            });
                    });
                } else {
                    console.log('sin contraseña');
                    if (params.nombre != usuario.nombre) {
                        usuario.nombre = params.nombre;
                    }
                    if (params.apellidos != usuario.apellidos) {
                        usuario.apellidos = params.apellidos;
                    }
                    if (params.email != usuario.email) {
                        usuario.email = params.email;
                    }
                    if (params.rol != usuario.rol) {
                        usuario.rol = params.rol;
                    }
                    if (params.imagen != usuario.imagen) {
                        usuario.imagen = params.imagen;
                    }
                    // save recibe una función callback, con el posible error y el objeto que guarda.
                    usuario.save()
                        .then(function (usuario) {
                            res.status(200).send({ usuario });
                        })
                        .catch(function (error) {
                            console.log("Error producido en editUsuario: " + error);
                            res.status(500).send({ mensaje: "Error al editar usuario. Seguramente el email ya esté dado de alta.", error: error });
                        });
                }
            } else {
                res.status(404).send({ mensaje: "No se ha encontrado el usuario a editar." });
            }
        })
        .catch(function (error) {
            console.log("Error producido en editUsuario: " + error);
            res.status(500).send({ mensaje: "Error al recuperar el usuario.", error: error });
        });
}

function uploadImagen(req, res) {
    var usuarioId = req.params.id;
    var file_nombre = 'No subido ...';

    if (req.files) {
        var file_ruta = req.files.imagen.path;
        var file_split = file_ruta.split('\\');
        var file_nombre = file_split[2];
        var name_split = file_nombre.split('\.');
        var file_ext = name_split[1];

        if (file_ext === 'png' || file_ext === 'jpg' || file_ext === 'jpeg') {
            Usuario.findById(usuarioId)
                .then(function (usuario) {
                    if (usuario) {
                        usuario.imagen = file_nombre;

                        // save recibe una función callback, con el posible error y el objeto que guarda.
                        usuario.save()
                            .then(function (usuario) {
                                res.status(200).send({ imagen: file_nombre, usuario });
                            })
                            .catch(function (error) {
                                console.log("Error producido en uploadImagen: " + error);
                                res.status(500).send({ mensaje: "Se ha producido un error al guardar nombre de imagen.", error: error });
                            });                        
                    } else {
                        res.status(404).send({ mensaje: "No se ha encontrado el usuario a editar." });
                    }
                })
                .catch(function (error) {
                    console.log("Error producido en updateImagen: " + error);
                    res.status(500).send({ mensaje: "Error al recuperar el usuario.", error: error });
                });
        } else {
            res.status(200).send({ mensaje: 'Extensión no válida.' });
        }
    } else {
        res.status(200).send({ mensaje: 'No se ha subido ninguna imagen.' } );
    }
}

function getImagenFile(req, res) {
    var imagenFile = req.params.imagenFile;
    var rutaImagen = './uploads/usuarios/' + imagenFile;

    fs.exists(rutaImagen, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(rutaImagen));
        } else {
            res.status(200).send({ mensaje: 'No se ha encontrado la imagen.' });
        }
    });
}

module.exports = {
    getUsuarios,
    nuevoUsuario,
    loginUsuario,
    editUsuario,
    uploadImagen,
    getImagenFile
}