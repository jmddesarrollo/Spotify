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
 * Consultar todos los artistas.
 */
function getArtistas(req, res) {

    Artista.findAll({ order: [['nombre', 'ASC']] })
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
 * Añadir nueva artista
 */
function nuevoArtista(req, res) {
    var artista = new Artista;

    var params = req.body;

    console.log('nuveo');

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


/*
 * Modificar un artista
 */
function editArtista(req, res) {
    var artistaId = req.params.id;
    var params = req.body;

    Artista.findById(artistaId)
        .then(function (artista) {
            if (artista) {
                if (params.nombre) {
                    artista.nombre = params.nombre;
                }
                if (params.descripcion) {
                    artista.descripcion = params.descripcion;
                }
                if (params.imagen) {
                    artista.imagen = params.imagen;
                }
                // save recibe una función callback, con el posible error y el objeto que guarda.
                artista.save()
                    .then(function (artista) {
                        res.status(200).send({ artista });
                    })
                    .catch(function (error) {
                        console.log("Error producido en editArtista: " + error);
                        res.status(500).send({ mensaje: "Se ha producido un error al editar el artista.", error: error });
                    });
                
            } else {
                res.status(404).send({ mensaje: "No se ha encontrado el artista a editar." });
            }
        })
        .catch(function (error) {
            console.log("Error producido en editArtista: " + error);
            res.status(500).send({ mensaje: "Error al recuperar el artista.", error: error });
        });
}

/*
 * Eliminación de artista
 */
function delArtista(req, res) {
    var artistaId = req.params.id;

    Artista.destroy({ where: { id: artistaId } })
        .then(function (count) {
            if (count[0] == 0) {
                res.status(404).send({ message: "No se ha encontrado artista a eliminar.", count: count });
            } else {
                res.status(200).send({ artistaId: artistaId, count: count });
            }
        })
        .catch(function (error) {
            console.log("Error producido deleteArtista: " + error);
            res.status(500).send({ message: "Se ha producido un error al eliminar el artista.", error: error });
        });
}

// Subir imagen de artista
function uploadImagen(req, res) {
    var artistaId = req.params.id;
    var file_nombre = 'No subido ...';

    if (req.files) {
        var file_ruta = req.files.imagen.path;
        var file_split = file_ruta.split('\\');
        var file_nombre = file_split[2];
        var name_split = file_nombre.split('\.');
        var file_ext = name_split[1];

        if (file_ext === 'png' || file_ext === 'jpg' || file_ext === 'jpeg') {
            Artista.findById(artistaId)
                .then(function (artista) {
                    if (artista) {
                        artista.imagen = file_nombre;

                        // save recibe una función callback, con el posible error y el objeto que guarda.
                        artista.save()
                            .then(function (artista) {
                                res.status(200).send({ artista });
                            })
                            .catch(function (error) {
                                console.log("Error producido en uploadImagen: " + error);
                                res.status(500).send({ mensaje: "Se ha producido un error al guardar nombre de imagen.", error: error });
                            });
                    } else {
                        res.status(404).send({ mensaje: "No se ha encontrado el artista." });
                    }
                })
                .catch(function (error) {
                    console.log("Error producido en updateImagen: " + error);
                    res.status(500).send({ mensaje: "Error al recuperar el artista.", error: error });
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
    var rutaImagen = './uploads/artistas/' + imagenFile;

    fs.exists(rutaImagen, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(rutaImagen));
        } else {
            res.status(200).send({ mensaje: 'No se ha encontrado la imagen.' });
        }
    });
}

/*
 * Consultar un artista con sus albums y canciones.
 */
function getArtistaAlbumsCanciones(req, res) {
    var artistaId = req.params.id;

    Artista.findById(artistaId)
        .then(function (artista) {    
            if (artista) {
                getAlbumsCanciones(artista.id).then((value) => {
                    res.status(200).send({ artista, albums: value.albumes, canciones: value.canciones });
                })
                
            } else {
                res.status(404).send({ mensaje: "No se ha encontrado el artista." });                
            }
        })
        .catch(function (error) {
            console.log("Error producido en getArtista: " + error);
            res.status(500).send({ mensaje: "Error al recuperar datos del artista.", error: error });
        });
}


/*
 * Función asincrona para recoger albums y canciones del artista
 */
 async function getAlbumsCanciones(artistaId) {
    var albumes = await Album.findAll({ where: {artista_id: artistaId}, order: [['anho', 'ASC'], ['titulo', 'ASC']] })
        .then(function (albums) {
            if (albums) {
                return albums;
            } else {
                return null;
            }
        })
        .catch(function (error) {
            return null;
        });

    var canciones = await Cancion.findAll({ where: {artistas_id: artistaId}, order: [['album_id', 'ASC'], ['numero', 'ASC'], ['nombre', 'ASC']] })
        .then(function (cancions) {
            if (cancions) {
                return cancions;
            } else {
                return null;
            }
        })
        .catch(function (error) {
            return null;
        });  

        return {
            albumes,
            canciones
        }      
 }

module.exports = {
    getArtista,
    getArtistas,
    nuevoArtista,
    editArtista,
    delArtista,
    uploadImagen,
    getImagenFile,
    getArtistaAlbumsCanciones
}