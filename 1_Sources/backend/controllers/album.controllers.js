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
 * Consultar un album.
 */
function getAlbum(req, res) {
    var albumId = req.params.id;

    Album.findById(albumId)
        .then(function (album) {
            if (!album) {
                res.status(404).send({ mensaje: "No se ha encontrado el album." });
            } else {
                res.status(200).send({ album });
            }
        })
        .catch(function (error) {
            console.log("Error producido en getAlbum: " + error);
            res.status(500).send({ mensaje: "Error al recuperar datos del album.", error: error });
        });
}

/*
 * Consultar todos los albums.
 */
function getAlbums(req, res) {
    var artistaId = req.params.id;

    if (artistaId) {
        Album.findAll({ where: {artista_id: artistaId}, order: [['anho', 'ASC'], ['titulo', 'ASC']] })
            .then(function (albums) {
                if (!albums) {
                    res.status(404).send({ mensaje: "No se ha encontrado ningún album." });
                } else {
                    res.status(200).send({ albums });
                }
            })
            .catch(function (error) {
                console.log("Error producido en getAlbums: " + error);
                res.status(500).send({ mensaje: "Error al recuperar datos de los albums.", error: error });
            });
    } else {
        Album.findAll({ order: [['anho', 'ASC'], ['titulo', 'ASC']] })
            .then(function (albums) {
                if (!albums) {
                    res.status(404).send({ mensaje: "No se ha encontrado ningún album." });
                } else {
                    res.status(200).send({ albums });
                }
            })
            .catch(function (error) {
                console.log("Error producido en getAlbums: " + error);
                res.status(500).send({ mensaje: "Error al recuperar datos de los albums.", error: error });
            });
    }
}

/*
 * Añadir nueva album
 */
function nuevoAlbum(req, res) {
    var album = new Album;

    var params = req.body;    

    Album.create({
        titulo: params.titulo,
        descripcion: params.descripcion,
        anho: params.anho,
        imagen: null,
        artista_id: params.artistaId
    }).then(function (album) {
        res.status(200).send({ album });
    }).catch(function (error) {
        console.log("Error producido nuevoAlbum: " + error);
        res.status(500).send({ mensaje: "Se ha producido un error al añadir un album.", error: error });
    });
}


/*
 * Modificar un album
 */
function editAlbum(req, res) {
    var albumId = req.params.id;
    var params = req.body;

    Album.findById(albumId)
        .then(function (album) {
            if (album) {
                if (params.titulo) {
                    album.titulo = params.titulo;
                }
                if (params.descripcion) {
                    album.descripcion = params.descripcion;
                }
                if (params.anho) {
                    album.anho = params.anho;
                }
                if (params.imagen) {
                    album.imagen = params.imagen;
                }
                // save recibe una función callback, con el posible error y el objeto que guarda.
                album.save()
                    .then(function (album) {
                        res.status(200).send({ album });
                    })
                    .catch(function (error) {
                        console.log("Error producido en editAlbum: " + error);
                        res.status(500).send({ mensaje: "Se ha producido un error al editar el album.", error: error });
                    });

            } else {
                res.status(404).send({ mensaje: "No se ha encontrado el album a editar." });
            }
        })
        .catch(function (error) {
            console.log("Error producido en editAlbum: " + error);
            res.status(500).send({ mensaje: "Error al recuperar el album.", error: error });
        });
}

/*
 * Eliminación de album
 */
function delAlbum(req, res) {
    var albumId = req.params.id;

    Album.destroy({ where: { id: albumId } })
        .then(function (count) {
            if (count[0] == 0) {
                res.status(404).send({ message: "No se ha encontrado album a eliminar.", count: count });
            } else {
                res.status(200).send({ albumId: albumId, count: count });
            }
        })
        .catch(function (error) {
            console.log("Error producido deleteAlbum: " + error);
            res.status(500).send({ message: "Se ha producido un error al eliminar el album.", error: error });
        });
}

// Subir imagen de album
function uploadImagen(req, res) {
    var albumId = req.params.id;
    var file_nombre = 'No subido ...';

    if (req.files) {
        var file_ruta = req.files.imagen.path;
        var file_split = file_ruta.split('\\');
        var file_nombre = file_split[2];
        var name_split = file_nombre.split('\.');
        var file_ext = name_split[1];

        if (file_ext === 'png' || file_ext === 'jpg' || file_ext === 'jpeg') {
            Album.findById(albumId)
                .then(function (album) {
                    if (album) {
                        album.imagen = file_nombre;

                        // save recibe una función callback, con el posible error y el objeto que guarda.
                        album.save()
                            .then(function (album) {
                                res.status(200).send({ album });
                            })
                            .catch(function (error) {
                                console.log("Error producido en uploadImagen: " + error);
                                res.status(500).send({ mensaje: "Se ha producido un error al guardar nombre de la imagen para el album.", error: error });
                            });
                    } else {
                        res.status(404).send({ mensaje: "No se ha encontrado el album." });
                    }
                })
                .catch(function (error) {
                    console.log("Error producido en updateImagen: " + error);
                    res.status(500).send({ mensaje: "Error al recuperar el album.", error: error });
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
    var rutaImagen = './uploads/albumes/' + imagenFile;

    fs.exists(rutaImagen, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(rutaImagen));
        } else {
            res.status(200).send({ mensaje: 'No se ha encontrado la imagen.' });
        }
    });
}

module.exports = {
    getAlbum,
    getAlbums,
    nuevoAlbum,
    editAlbum,
    delAlbum,
    uploadImagen,
    getImagenFile
}