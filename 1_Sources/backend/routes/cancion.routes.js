'use strict'

var express = require('express');
var CancionController = require('../controllers/cancion.controllers');
var api = express.Router();

// Cargar middleware de autentificación
var mw_auth = require('../middlewares/authenticated');

// Subir archivos y mandarlos por protocolo HTTP
var multipart = require('connect-multiparty');
var mw_upload = multipart({ uploadDir: './uploads/canciones' });

// Crear una ruta por GET con express
api.get('/album/:id', mw_auth.ensureAuth, CancionController.getCancion);
api.get('/canciones/:id?', mw_auth.ensureAuth, CancionController.getCanciones);
api.post('/cancion', mw_auth.ensureAuth, CancionController.nuevaCancion);
api.put('/cancion/:id', mw_auth.ensureAuth, CancionController.editCancion);
api.delete('/cancion/:id', mw_auth.ensureAuth, CancionController.delCancion);
api.post('/upload-archivo-cancion/:id', [mw_auth.ensureAuth, mw_upload], CancionController.uploadArchivo);
api.get('/get-cancion-archivo/:archivoFile', CancionController.getCancionFile);

module.exports = api;