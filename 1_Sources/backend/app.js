'use strict'

// Configuración relativa a Express -> Paquete de trabajo con HTML: rutas, métodos de petición API RESTful (GET, POST, PUT, DELETE)
var express = require('express');
// Convertir las peticiones que lleguen por HTML a un objeto de javasctipt
var bodyParser = require('body-parser');

// Instancia de express
var app = express();

// Cargar rutas
var usuario_routes = require('./routes/usuario.routes');
var artista_routes = require('./routes/artista.routes');
var album_routes = require('./routes/album.routes');
var cancion_routes = require('./routes/cancion.routes');
//

// Middleware: Antes de recibir http se lanza lo que le indiquemos aquí.
// Método que se ejecuta antes de que llegue a un controlador. 
// Recibe datos por método HTTP.
// Convierte datos recibidos en petición a objeto JSON, a un objeto javascript listo para usar.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//

// Al crear nuestro cliente (Frontend) que tire del API puede dar problemas con el CORS, cruzado de dominios, ...
// Middleware propio para solucionar este problema.
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});
//

// Rutas
app.use('/api', usuario_routes);
app.use('/api', artista_routes);
app.use('/api', album_routes);
app.use('/api', cancion_routes);
//

// Exportación del modulo para poder ser usado en otro componente.
module.exports = app;