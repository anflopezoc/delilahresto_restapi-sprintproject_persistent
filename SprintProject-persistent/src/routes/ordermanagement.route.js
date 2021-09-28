const express = require('express');
const router = express.Router();
const controller = require('../controllers/ordermanagement.controller');
const adminValidator = require('../middlewares/adminvalidator.middleware').adminvalidator;

//middleware
router.use(adminValidator);
router.use('/', require('../middlewares/uservalidator.middleware').userexistencevalidator)

//Routes
router.get('/allstates', controller.allStatemethods);

router.get('/allorders', controller.allOrders);

router.put('/order/:idOrder/state/:idState', controller.stateorder)

module.exports = router