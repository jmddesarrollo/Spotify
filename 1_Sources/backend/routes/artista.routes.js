'use strict'

var express = require('express');
var ArtistaController = require('../controllers/artista.controllers');
var api = express.Router();

// Cargar middleware de autentificación
var mw_auth = require('../middlewares/authenticated');

// Subir archivos y mandarlos por protocolo HTTP
var multipart = require('connect-multiparty');
var mw_upload = multipart({ uploadDir: './uploads/usuarios' });

// Crear una ruta por GET con express
api.get('/artista/:id', mw_auth.ensureAuth, ArtistaController.getArtista);
api.get('/artistas', mw_auth.ensureAuth, ArtistaController.getArtistas);
api.post('/artista', mw_auth.ensureAuth, ArtistaController.nuevoArtista);
// api.post('/login', UsuarioController.loginUsuario);
// api.put('/usuario/:id', mw_auth.ensureAuth, UsuarioController.editUsuario);
// api.post('/upload-imagen-usuario/:id', [mw_auth.ensureAuth, mw_upload], UsuarioController.uploadImagen);
// api.get('/get-imagen-usuario/:imagenFile', UsuarioController.getImagenFile);

module.exports = api;