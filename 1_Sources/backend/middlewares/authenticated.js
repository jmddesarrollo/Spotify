'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
// Variable secreta a�adida al token y aumentar la seguridad.
// Debe ser la misma que en la codificaci�n, en jwt.js
var secret = 'clave_secreta';

exports.ensureAuth = function (req, res, next) {
    // Comprobar que la cabecera contiene variable para autentificaci�n
    if (!req.headers.authorization) {
        return res.status(403).send({mensaje: 'La petici�n no tiene la cabecera de autentificaci�n.'});
    }

    // Quitar todas las comillas simples o dobles que vengan en el token
    var token = req.headers.authorization.replace(/['"]+/g, '');

    // try: capturar excepciones que puedan ocurrir y salir con un error.
    try {
        var payload = jwt.decode(token, secret);

        if (payload.exp <= moment().unix()) {
            return res.status(403).send({ mensaje: 'Token ha expirado.' });
        }

    } catch (ex) {
        return res.status(403).send({ mensaje: 'Token no v�lido.' });
    }

    // Crear en la Petici�n (req) una variable usuario que lleve todos los datos decodificados del token.
    req.usuario = payload;

    next();
}