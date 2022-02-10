const express = require('express');
const router = express.Router()

router.get('/', function(req, res){
    console.log(' Peticion GET a /');
    res.send('Hello World!');
})

module.exports = router