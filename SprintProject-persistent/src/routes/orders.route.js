const express = require('express');
const router = express.Router();
const controller = require('../controllers/orders.controller');


//Middleware
router.use('/', require('../middlewares/uservalidator.middleware').userexistencevalidator)


router.get('/order', controller.Order);

router.post('/addproduct/:id', controller.addProductOrder);

router.delete('/substractproduct/:id', controller.substractProductOrder);

router.put('/addaddress/:id', controller.addAddress);

router.put('/addpayment/:id', controller.addPaymentMethod);

router.put('/confirmorder', controller.confirmorder);

router.get('/allorders', controller.AllOrders);

module.exports = router