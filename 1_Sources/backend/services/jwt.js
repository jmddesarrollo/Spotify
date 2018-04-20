'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');

// Variable secreta para añadir al token y aumentar la seguridad.
var secret = 'clave_secreta';

exports.createToken = function (usuario) {
    // sub: id del objeto
    // name: nombre del objeto
    // iat: fecha de creación del token
    // exp: fecha de expiración del token (30 días)
    var payload = {
        sub: usuario.id,
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        email: usuario.email,
        rol: usuario.rol,
        imagen: usuario.imagen,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    };

    return jwt.encode(payload, secret);
};