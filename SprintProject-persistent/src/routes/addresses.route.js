const express = require('express');
const router = express.Router();
const controller = require('../controllers/addresses.controllers');

//Middleware
router.use('/', require('../middlewares/uservalidator.middleware').userexistencevalidator);



router.get('/alladdresses', controller.allAddresses);

router.post('/newaddress', controller.newAddresses);

router.put('/addressupdate/:id', controller.adressUpdate);

router.delete('/deleteaddress/:id', controller.adressDelete);

module.exports = router