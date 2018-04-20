'use strict'

const Sequelize = require('sequelize');

// Objeto con todo el objeto Express.
var app = require('./app');

var port = process.env.PORT || 3678;

// Crear un servidor que escucha las peticiones HTTP
app.listen(port, function () {
    console.log("A la escucha en http://localhost:" + port);
}); 