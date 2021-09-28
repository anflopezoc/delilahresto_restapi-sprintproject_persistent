const express = require('express');
const router = express.Router();
const controller = require('../controllers/products.controller');
const middlewareAdmin = require('../middlewares/adminvalidator.middleware').adminvalidator;
const {cache, client}= require('../middlewares/redis.middleware');

//Middleware
router.use('/', require('../middlewares/uservalidator.middleware').userexistencevalidator)

//Routes Products

router.get('/allproducts', cache, controller.getproducts);

router.post('/newproduct', middlewareAdmin, controller.newproduct, cache);

router.put('/productupdate/:id', middlewareAdmin, controller.productUpdate, cache);

router.delete('/productinactive/:id', middlewareAdmin, controller.inactiveproduct, cache);


module.exports = router