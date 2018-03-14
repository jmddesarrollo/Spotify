'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuario.controllers');
var api = express.Router();

// Cargar middleware de autentificación
var mw_auth = require('../middlewares/authenticated');

// Subir archivos y mandarlos por protocolo HTTP
var multipart = require('connect-multiparty');
var mw_upload = multipart({ uploadDir: './uploads/usuarios' });

// Crear una ruta por GET con express
api.get('/usuarios', UsuarioController.getUsuarios);
api.post('/usuario', UsuarioController.nuevoUsuario);
api.post('/login', UsuarioController.loginUsuario);
api.put('/usuario/:id', mw_auth.ensureAuth, UsuarioController.editUsuario);
api.post('/upload-imagen-usuario/:id', [mw_auth.ensureAuth, mw_upload], UsuarioController.uploadImagen);
api.get('/get-imagen-usuario/:imagenFile', UsuarioController.getImagenFile);

module.exports = api;