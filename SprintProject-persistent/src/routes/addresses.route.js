const express = require('express');
const router = express.Router();
const controller = require('../controllers/addresses.controllers');

//Middleware
router.use('/', require('../middlewares/uservalidator.middleware').userexistencevalidator);


//Routes

/**
* @swagger
* /addresses/alladdresses:
*      get:
*          summary: Show all user addresses.
*          description: End point to show all user adresses.
*          tags: [User_addresses]
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
router.get('/alladdresses', controller.allAddresses);

/**
* @swagger
* /addresses/newaddress:
*      post:
*          summary: Create a new user address.
*          description: End point to create a new user address. Return the new user address.
*          tags: [User_addresses]
*          security: 
*                   - bearerAuth: []
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                     schema:
*                          $ref: '#/components/schemas/newaddress'
*                     type: 
*                          object            
*          responses:
*                  '200':
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*
*                  404:
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*/
router.post('/newaddress', controller.newAddresses);

/**
* @swagger
* /addresses/addressupdate/{id}:
*      put:
*          summary: Update user address.
*          description: End point to update a user address ID. Returns a text announcing the update.
*          tags: [User_addresses]
*          security: 
*                   - bearerAuth: []
*          parameters:
*            - in: path
*              name: id
*              description: Address user ID.
*              required: true
*              type: integer 
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                     schema:
*                          $ref: '#/components/schemas/newaddress'
*                     type: 
*                          object            
*          responses:
*                  '200':
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*
*                  '400':
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*                  '404':
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*/
router.put('/addressupdate/:id', controller.adressUpdate);

/**
* @swagger
* /addresses/deleteaddress/{id}:
*      delete:
*          summary: Inactive user address Path.
*          description: End point to inactivate a user address with ID in parameters. Returns a text announcing that address user is inactivated.
*          tags: [User_addresses]
*          security: 
*                   - bearerAuth: []
*          parameters:
*            - in: path
*              name: id
*              description: Address user ID.
*              required: true
*              type: integer           
*          responses:
*                  '200':
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*                  400:
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*                  404:
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*/
router.delete('/deleteaddress/:id', controller.adressDelete);

module.exports = router;


// -----Schemas Swagger-----

/**
 * @swagger
 * name: User address model.
 * description: Model for creating or updating user addresses.
 * components:
 *  schemas:
 *      newaddress:
 *          type: object
 *          required:
 *              -address
 *              -city
 *          properties:
 *              address:
 *                  type: string
 *                  example: Calle 90 N. 99 - 100
 *                  description: Adreess model.
 *              city:
 *                  type: string
 *                  example: Medellin, Colombia
 *                  description: Adreess and city model.
 *                  
 */