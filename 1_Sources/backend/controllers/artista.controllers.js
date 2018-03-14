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
var Artista = db.artista;
var Album = db.album;
var Cancion = db.cancion;

// Operandos
var Op = Sequelize.Op;

/*
 * Consultar un artista.
 */
function getArtista(req, res) {
    var artistaId = req.params.id;

    Artista.findById(artistaId)
        .then(function (artista) {    
            if (!artista) {
                res.status(404).send({ mensaje: "No se ha encontrado el artista." });
            } else {
                res.status(200).send({ artista });
            }
        })
        .catch(function (error) {
            console.log("Error producido en getArtista: " + error);
            res.status(500).send({ mensaje: "Error al recuperar datos del artista.", error: error });
        });
}

/*
 * Consultar todos los usuarios.
 */
function getArtistas(req, res) {

    Artista.findAll()
        .then(function (artistas) {
            if (!artistas) {
                res.status(404).send({ mensaje: "No se ha encontrado ningún artista." });
            } else {
                res.status(200).send({ artistas });
            }
        })
        .catch(function (error) {
            console.log("Error producido en getArtista: " + error);
            res.status(500).send({ mensaje: "Error al recuperar datos del artista.", error: error });
        });
}

/*
 * Añadir nueva estructura empresa
 */
function nuevoArtista(req, res) {
    var artista = new Artista;

    var params = req.body;

    artista.nombre = params.nombre;
    artista.descripcion = params.descripcion;
    artista.imagen = null;

    Artista.create({
        nombre: params.nombre,
        descripcion: params.descripcion,        
        imagen: null
    }).then(function (artista) {
        res.status(200).send({ artista });
    }).catch(function (error) {
        console.log("Error producido nuevoArtista: " + error);
        res.status(500).send({ mensaje: "Se ha producido un error al añadir un artista.", error: error });
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
                        res.status(404).send({ mensaje: "La contraseña es incorrecta." });
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

    Usuario.findById(usuarioId)
        .then(function (usuario) {
            if (usuario) {
                if (params.contrasenha) {
                    bcrypt.hash(params.contrasenha, null, null, function (err, hash) {
                        usuario.contrasenha = hash;

                        if (params.nombre) {
                            usuario.nombre = params.nombre;
                        }
                        if (params.apellidos) {
                            usuario.apellidos = params.apellidos;
                        }
                        if (params.email) {
                            usuario.email = params.email;
                        }
                        if (params.rol) {
                            usuario.rol = params.rol;
                        }
                        if (params.imagen) {
                            usuario.imagen = params.imagen;
                        }
                        // save recibe una función callback, con el posible error y el objeto que guarda.
                        usuario.save()
                            .then(function (usuario) {
                                res.status(200).send({ usuario });
                            })
                            .catch(function (error) {
                                console.log("Error producido en editUsuario: " + error);
                                res.status(500).send({ mensaje: "Se ha producido un error al editar un usuario.", error: error });
                            });
                    });
                } else {
                    if (params.nombre) {
                        usuario.nombre = params.nombre;
                    }
                    if (params.apellidos) {
                        usuario.apellidos = params.apellidos;
                    }
                    if (params.email) {
                        usuario.email = params.email;
                    }
                    if (params.rol) {
                        usuario.rol = params.rol;
                    }
                    if (params.imagen) {
                        usuario.imagen = params.imagen;
                    }
                    // save recibe una función callback, con el posible error y el objeto que guarda.
                    usuario.save()
                        .then(function (usuario) {
                            res.status(200).send({ usuario });
                        })
                        .catch(function (error) {
                            console.log("Error producido en editUsuario: " + error);
                            res.status(500).send({ mensaje: "Se ha producido un error al editar un usuario.", error: error });
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
                                res.status(200).send({ usuario });
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
        res.status(200).send({ mensaje: 'No se ha subido ninguna imagen.' });
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
    getArtista,
    getArtistas,
    nuevoArtista,
    loginUsuario,
    editUsuario,
    uploadImagen,
    getImagenFile
}