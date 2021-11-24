const express = require('express');
const router = express.Router();
const controller = require('../controllers/ordermanagement.controller');
const adminValidator = require('../middlewares/adminvalidator.middleware').adminvalidator;

//middleware
router.use(adminValidator);
router.use('/', require('../middlewares/uservalidator.middleware').userexistencevalidator)

//Routes
/**
* @swagger
* /ordermanagement/allstatus:
*      get:
*          summary: Show all orders status.
*          description: End point to show all orders status in Delilah Resto.
*          tags: [Order_Managment]
*          security: 
*                   - bearerAuth: []         
*          responses:
*                  '200':
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*                  '404':
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*/
router.get('/allstatus', controller.allStatemethods);

/**
* @swagger
* /ordermanagement/allorders:
*      get:
*          summary: Show all orders users.
*          description: End point to show all orders users in Delilah Resto.
*          tags: [Order_Managment]
*          security: 
*                   - bearerAuth: []         
*          responses:
*                  '200':
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*                  '404':
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*/
router.get('/allorders', controller.allOrders);

/**
* @swagger
* /ordermanagement/order/{idOrder}/status/{idStatus}:
*      put:
*          summary: Change state to one order.
*          description: End point to show all orders users in Delilah Resto.
*          tags: [Order_Managment]
*          security: 
*                   - bearerAuth: []
*          parameters:
*            - in: path
*              name: idOrder
*              description: Order ID to manage.
*              required: true
*              type: integer
*            - in: path
*              name: idStatus
*              description: Status ID to be assigned to the order.
*              required: true
*              type: integer        
*          responses:
*                  '200':
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*                  '404':
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*/
router.put('/order/:idOrder/status/:idStatus', controller.stateorder)

module.exports = router