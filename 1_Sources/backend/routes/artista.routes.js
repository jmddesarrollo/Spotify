'use strict'

var express = require('express');
var ArtistaController = require('../controllers/artista.controllers');
var api = express.Router();

// Cargar middleware de autentificación
var mw_auth = require('../middlewares/authenticated');

// Subir archivos y mandarlos por protocolo HTTP
var multipart = require('connect-multiparty');
var mw_upload = multipart({ uploadDir: './uploads/artistas' });

// Crear una ruta por GET con express
api.get('/artista/:id', mw_auth.ensureAuth, ArtistaController.getArtista);
api.get('/artistas', mw_auth.ensureAuth, ArtistaController.getArtistas);
api.post('/artista', mw_auth.ensureAuth, ArtistaController.nuevoArtista);
api.put('/artista/:id', mw_auth.ensureAuth, ArtistaController.editArtista);
api.delete('/artista/:id', mw_auth.ensureAuth, ArtistaController.delArtista);
api.post('/upload-imagen-artista/:id', [mw_auth.ensureAuth, mw_upload], ArtistaController.uploadImagen);
api.get('/get-imagen-artista/:imagenFile', ArtistaController.getImagenFile);

module.exports = api;