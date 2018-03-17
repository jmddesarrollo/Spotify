'use strict'

var Sequelize = require('sequelize');

// Encriptaci�n
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
 * Consultar una canci�n.
 */
function getCancion(req, res) {
    var cancionId = req.params.id;

    Cancion.findById(cancionId)
        .then(function (cancion) {
            if (!cancion) {
                res.status(404).send({ mensaje: "No se ha encontrado la canci�n." });
            } else {
                res.status(200).send({ cancion });
            }
        })
        .catch(function (error) {
            console.log("Error producido en getCancnion: " + error);
            res.status(500).send({ mensaje: "Error al recuperar datos de la canci�n.", error: error });
        });
}

/*
 * Consultar todos las cancniones.
 */
function getCanciones(req, res) {
    var albumId = req.params.id;

    if (albumId) {
        Cancion.findAll({ where: {album_id: albumId}, order: [['album_id', 'ASC'], ['numero', 'ASC'], ['nombre', 'ASC']] })
            .then(function (canciones) {
                if (!canciones) {
                    res.status(404).send({ mensaje: "No se ha encontrado ninguna canci�n." });
                } else {
                    res.status(200).send({ canciones });
                }
            })
            .catch(function (error) {
                console.log("Error producido en getCanciones: " + error);
                res.status(500).send({ mensaje: "Error al recuperar datos de las canciones.", error: error });
            });
    } else {
        Cancion.findAll({ order: [['album_id', 'ASC'], ['numero', 'ASC'], ['nombre', 'ASC']] })
            .then(function (canciones) {
                if (!canciones) {
                    res.status(404).send({ mensaje: "No se ha encontrado ninguna canci�n." });
                } else {
                    res.status(200).send({ canciones });
                }
            })
            .catch(function (error) {
                console.log("Error producido en getCanciones: " + error);
                res.status(500).send({ mensaje: "Error al recuperar datos de las canciones.", error: error });
            });
    }
}

/*
 * A�adir nueva canci�n
 */
function nuevaCancion(req, res) {

    var params = req.body;

    Cancion.create({
        numero: params.numero,
        nombre: params.nombre,
        duracion: params.duracion,
        archivo: null,
        album_id: params.albumId
    }).then(function (album) {
        res.status(200).send({ album });
    }).catch(function (error) {
        console.log("Error producido nuevaCancion: " + error);
        res.status(500).send({ mensaje: "Se ha producido un error al a�adir una canci�n.", error: error });
    });
}


/*
 * Modificar una canci�n
 */
function editCancion(req, res) {
    var cancionId = req.params.id;
    var params = req.body;

    Cancion.findById(cancionId)
        .then(function (cancion) {
            if (cancion) {
                if (params.numero) {
                    cancion.numero = params.numero;
                }
                if (params.nombre) {
                    cancion.nombre = params.nombre;
                }
                if (params.duracion) {
                    cancion.duracion = params.duracion;
                }
                if (params.archivo) {
                    cancion.archivo = params.archivo;
                }
                // save recibe una funci�n callback, con el posible error y el objeto que guarda.
                cancion.save()
                    .then(function (cancion) {
                        res.status(200).send({ cancion });
                    })
                    .catch(function (error) {
                        console.log("Error producido en editCancion: " + error);
                        res.status(500).send({ mensaje: "Se ha producido un error al editar la canci�n.", error: error });
                    });

            } else {
                res.status(404).send({ mensaje: "No se ha encontrado la canci�n a editar." });
            }
        })
        .catch(function (error) {
            console.log("Error producido en editCancion: " + error);
            res.status(500).send({ mensaje: "Error al recuperar la canci�n.", error: error });
        });
}

/*
 * Eliminaci�n de canci�n
 */
function delCancion(req, res) {
    var cancionId = req.params.id;

    Cancion.destroy({ where: { id: cancionId } })
        .then(function (count) {
            if (count[0] == 0) {
                res.status(404).send({ message: "No se ha encontrado la canci�n a eliminar.", count: count });
            } else {
                res.status(200).send({ cancionId: cancionId, count: count });
            }
        })
        .catch(function (error) {
            console.log("Error producido deleteCancion: " + error);
            res.status(500).send({ message: "Se ha producido un error al eliminar la canci�n.", error: error });
        });
}

// Subir archivo de la canci�n
function uploadArchivo(req, res) {
    var cancionId = req.params.id;
    var file_nombre = 'No subido ...';

    if (req.files) {
        var file_ruta = req.files.archivo.path;
        var file_split = file_ruta.split('\\');
        var file_nombre = file_split[2];
        var name_split = file_nombre.split('\.');
        var file_ext = name_split[1];

        if (file_ext === 'mp3' || file_ext === 'ogg') {
            Cancion.findById(cancionId)
                .then(function (cancion) {
                    if (cancion) {
                        cancion.archivo = file_nombre;

                        // save recibe una funci�n callback, con el posible error y el objeto que guarda.
                        cancion.save()
                            .then(function (cancion) {
                                res.status(200).send({ cancion });
                            })
                            .catch(function (error) {
                                console.log("Error producido en uploadArchivo: " + error);
                                res.status(500).send({ mensaje: "Se ha producido un error al guardar nombre del archivo de la canci�n.", error: error });
                            });
                    } else {
                        res.status(404).send({ mensaje: "No se ha encontrado la canci�n." });
                    }
                })
                .catch(function (error) {
                    console.log("Error producido en updateArchivo: " + error);
                    res.status(500).send({ mensaje: "Error al recuperar la canci�n.", error: error });
                });
        } else {
            res.status(200).send({ mensaje: 'Extensi�n no v�lida.' });
        }
    } else {
        res.status(200).send({ mensaje: 'No se ha subido ninguna canci�n.' });
    }
}

function getCancionFile(req, res) {
    var archivoFile = req.params.archivoFile;
    var rutaArchivo = './uploads/canciones/' + archivoFile;

    fs.exists(rutaArchivo, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(rutaArchivo));
        } else {
            res.status(200).send({ mensaje: 'No se ha encontrado la canci�n.' });
        }
    });
}

module.exports = {
    getCancion,
    getCanciones,
    nuevaCancion,
    editCancion,
    delCancion,
    uploadArchivo,
    getCancionFile
}