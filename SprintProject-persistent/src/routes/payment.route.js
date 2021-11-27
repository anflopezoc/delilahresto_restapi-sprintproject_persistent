const express = require('express');
const router = express.Router();
const controller = require('../controllers/payment.controller');

//Middleware
router.use('/', require('../middlewares/uservalidator.middleware').userexistencevalidator)
const middlewareAdmin = require('../middlewares/adminvalidator.middleware').adminvalidator;
//Routes


/**
* @swagger
* /payments/allpayments:
*      get:
*          summary: Show all payment methods.
*          description: End point to show all payment methods for orders (Any user can to use this path)..
*          tags: [Payment_Methods]
*          security: 
*                   - bearerAuth: []         
*          responses:
*                  '200':
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*                  '400':
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*                  '404':
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*/
router.get('/allpayments', controller.allPayment);

/**
* @swagger
* /payments/newpayment:
*      post:
*          summary: Create a new payment methods.
*          description: End point to create a new payment methods for orders.
*          tags: [Payment_Methods]
*          security: 
*                   - bearerAuth: []  
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                     schema:
*                          $ref: '#/components/schemas/paymentmodel'
*                     type: 
*                          object         
*          responses:
*                  '200':
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*                  '400':
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*                  '404':
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*/
router.post('/newpayment', middlewareAdmin, controller.newPayment);

/**
* @swagger
* /payments/updatepayment/{id}:
*      put:
*          summary: Create a new payment methods.
*          description: End point to create a new payment methods for orders.
*          tags: [Payment_Methods]
*          security: 
*                   - bearerAuth: []
*          parameters:
*            - in: path
*              name: id
*              description: Payment Method ID.
*              required: true
*              type: integer   
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                     schema:
*                          $ref: '#/components/schemas/paymentmodel'
*                     type: 
*                          object         
*          responses:
*                  '200':
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*                  '400':
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*                  '404':
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*/
router.put('/updatepayment/:id', middlewareAdmin, controller.updatePayment);

/**
* @swagger
* /payments/inactivatepayment/{id}:
*      delete:
*          summary: Inactivate a payment methods.
*          description: End point to inactivate a payment methods for orders.
*          tags: [Payment_Methods]
*          security: 
*                   - bearerAuth: []
*          parameters:
*            - in: path
*              name: id
*              description: Payment Method ID.
*              required: true
*              type: integer   
*          responses:
*                  '200':
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*                  '400':
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*                  '404':
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*/
router.delete('/inactivatepayment/:id', middlewareAdmin, controller.inactivatePayment);

/**
* @swagger
* /payments/activatepayment/{id}:
*       put:
*          summary: Activate a payment methods.
*          description: End point to activate a payment methods for orders.
*          tags: [Payment_Methods]
*          security: 
*                   - bearerAuth: []
*          parameters:
*            - in: path
*              name: id
*              description: Payment Method ID.
*              required: true
*              type: integer   
*          responses:
*                  '200':
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*                  '400':
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*                  '404':
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*/
router.put('/activatepayment/:id', middlewareAdmin, controller.activatePayment);


// -----Schemas Swagger-----

/**
 * @swagger
 * name: User address model.
 * description: Model for creating or updating user addresses.
 * components:
 *  schemas:
 *      paymentmodel:
 *          type: object
 *          required:
 *              -method
 *          properties:
 *              method:
 *                  type: string
 *                  example: QR
 *                  description: payment method model.
 *                  
 */
module.exports = router;