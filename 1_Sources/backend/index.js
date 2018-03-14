'use strict'

const Sequelize = require('sequelize');

var app = require('./app');
var port = process.env.PORT || 3678;

app.listen(port, function () {
    console.log("A la escucha en http://localhost:" + port);
}); 