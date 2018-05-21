'use strict'

var Sequelize = require('sequelize');

// Cargar servicio de tiempo
var moment = require('moment');


// Cargar modelos
var db = require("../models");
var Usuario = db.usuario;

// Operandos
var Op = Sequelize.Op;


/*
 * Función de pruebas
 */
function pruebas(req, res) {
    // Recoger fecha de hoy. Ej: '2018-05-05T18:15:24-08:00'
    var hoy = moment().format();
    // Recoger hoy en formato unix. Ej: '1318781876'
    var hoy = moment().unix();

    Usuario.findAll()
        .then(function (usuarios) {
            if (usuarios) {
                usuarios.forEach(usuario => {
                    var usuarios_clean = [];
                    usuarios.forEach(usuario => {
                        usuarios_clean.push(usuario.id);
                    });                    
                });
                res.status(200).send({ usuarios_clean });                
            } else {
                res.status(404).send({ mensaje: "No se ha encontrado usuarios." });
            }
        })
        .catch(function (error) {            
            res.status(500).send({ mensaje: "Error al recuperar datos de los usuarios." });
        });    
}

module.exports = {    
    pruebas
}