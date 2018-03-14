'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta';

exports.ensureAuth = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({mensaje: 'La petici�n no tiene la cabecera de autentificaci�n.'});
    }

    // Quitar todas las comillas simples o dobles que vengan en el token
    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = jwt.decode(token, secret);

        if (payload.exp <= moment().unix()) {
            return res.status(403).send({ mensaje: 'Token ha expirado.' });
        }

    } catch (ex) {
        return res.status(403).send({ mensaje: 'Token no v�lido.' });
    }

    req.usuario = payload;

    next();
}