const basicAuth = require('express-basic-auth');
const {allUsers} = require('../models/users.models');

const autentication = (usuario, contrasena) => {
    const usuarioEncontrado = allUsers().find(u => u.email === usuario && u.password === contrasena);
    if (usuarioEncontrado){
        return true
    } else return false
};

function getUnauthorizedResponse(req) {
    (allUsers().some(u => u.email === req && u.isAdmin)) ? next() : res.status(400).json('No está autorizado en este sitio');
 }

module.exports = {autentication, getUnauthorizedResponse}

