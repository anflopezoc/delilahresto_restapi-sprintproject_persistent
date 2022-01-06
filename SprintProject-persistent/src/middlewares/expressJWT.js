const config = require('../config/config')
const expressJWT = require('express-jwt')
exports.midexJWT = expressJWT({
    secret: config.module.SIGNATUREJWT,
    algorithms: ['HS256']
    }).unless({
        path: ['/account/register','/account/login','/swagger/account/register', '/swagger/account/login' ]
    })

exports.valitorJWT = async (err,req,res,next) => {
    if ( err.name === 'UnauthorizedError') {
        res.status(401).json('Invalid Token');
    } else {
        res.status(500)
    }

}

