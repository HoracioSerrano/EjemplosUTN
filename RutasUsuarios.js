const express = require('express');

const rutasUsuario = express.Router();

rutasUsuario.get('/usuarioAlta', function (req, res, next) {
    console.log("/usuarioAlta");
    res.send("usuarioAlta");
});

rutasUsuario.get('/usuarioBaja', function (req, res, next) {
    console.log("/usuarioBaja");
    res.send("usuarioBaja");
});

rutasUsuario.get('/usuarioModificacion', function (req, res, next) {
    console.log("/usuarioModificacion");
    res.send("usuarioModificacion");
});


module.exports = {rutasUsuario};