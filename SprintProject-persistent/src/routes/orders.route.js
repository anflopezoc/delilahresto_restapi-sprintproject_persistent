const express = require('express');
const router = express.Router();
const controller = require('../controllers/orders.controller');


//Middleware
router.use('/', require('../middlewares/uservalidator.middleware').userexistencevalidator)

/**
* @swagger
* /orders/order:
*      get:
*          summary: Show the order in Pending status.
*          description: End point to show the user order in Pending status. The user will always have a single order in Pending status.
*          tags: [Orders]
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
router.get('/order', controller.Order);

/**
* @swagger
* /orders/addproduct/{id}:
*      post:
*          summary: Add a product to the order.
*          description: End point to add a product to the order with the Product ID.
*          tags: [Orders]
*          security: 
*                   - bearerAuth: []
*          parameters:
*            - in: path
*              name: id
*              description: Product ID.
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
router.post('/addproduct/:id', controller.addProductOrder);

/**
* @swagger
* /orders/substractproduct/{id}:
*      delete:
*          summary: Substract a product to the order.
*          description: End point to substract a product to the order with the Product ID.
*          tags: [Orders]
*          security: 
*                   - bearerAuth: []
*          parameters:
*            - in: path
*              name: id
*              description: Product ID.
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
router.delete('/substractproduct/:id', controller.substractProductOrder);

/**
* @swagger
* /orders/addaddress/{id}:
*      put:
*          summary: Add a address to the order.
*          description: End point to add a address  from the address user list to the order with the Address ID.
*          tags: [Orders]
*          security: 
*                   - bearerAuth: []
*          parameters:
*            - in: path
*              name: id
*              description: Address ID.
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
router.put('/addaddress/:id', controller.addAddress)

/**
* @swagger
* /orders/addpayment/{id}:
*      put:
*          summary: Add a payment method to the order.
*          description: End point to add a payment method from the address user list to the order with the payment method ID.
*          tags: [Orders]
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
router.put('/addpayment/:id', controller.addPaymentMethod);

/**
* @swagger
* /orders/confirmorder:
*      put:
*          summary: Confirm the order.
*          description: End point to confirm the order in pending status.
*          tags: [Orders]
*          security: 
*                   - bearerAuth: []
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                     schema:
*                          $ref: '#/components/schemas/confirmModel'
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
router.put('/confirmorder', controller.confirmorder);

/**
* @swagger
* /orders/allorders:
*      get:
*          summary: Show the historical user's oders.
*          description: End point to show the historical user's orders .
*          tags: [Orders]
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
router.get('/allorders', controller.AllOrders);

module.exports = router

/**
 * @swagger
 * name: Confirm model.
 * description: Model for to confirme the orders.
 * components:
 *  schemas:
 *      confirmModel:
 *          type: object
 *          required:
 *              -confirm
 *          properties:
 *              confirm:
 *                  type: string
 *                  example: Yes
 *                  description: Answer to confirm the order, this can be 'Yes' or 'No'.
 *                  
 */