const express = require('express');
const router = express.Router();
const controller = require('../controllers/payment.controller');

//Middleware
router.use('/', require('../middlewares/uservalidator.middleware').userexistencevalidator)


router.get('/allpayments', controller.allPayment);

router.post('/newpayment', controller.newPayment);

router.put('/updatepayment/:id', controller.updatePayment);

router.delete('/inactivatepayment/:id', controller.inactivatePayment);


module.exports = router;