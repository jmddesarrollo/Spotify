'use strict'

var express = require('express');
var AlbumController = require('../controllers/album.controllers');
var api = express.Router();

// Cargar middleware de autentificación
var mw_auth = require('../middlewares/authenticated');

// Subir archivos y mandarlos por protocolo HTTP
var multipart = require('connect-multiparty');
var mw_upload = multipart({ uploadDir: './uploads/albumes' });

// Crear una ruta por GET con express
api.get('/album/:id', mw_auth.ensureAuth, AlbumController.getAlbum);
api.get('/albumes/:id?', mw_auth.ensureAuth, AlbumController.getAlbums);
api.post('/album', mw_auth.ensureAuth, AlbumController.nuevoAlbum);
api.put('/album/:id', mw_auth.ensureAuth, AlbumController.editAlbum);
api.delete('/album/:id', mw_auth.ensureAuth, AlbumController.delAlbum);
api.post('/upload-imagen-album/:id', [mw_auth.ensureAuth, mw_upload], AlbumController.uploadImagen);
api.get('/get-imagen-album/:imagenFile', AlbumController.getImagenFile);

module.exports = api;