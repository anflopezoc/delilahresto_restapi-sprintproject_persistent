
const express = require('express');
const router = express.Router();
const controller = require('../controllers/users.controller');
const middlewareAdmin = require('../middlewares/adminvalidator.middleware').adminvalidator;
const middlewareUser = require('../middlewares/uservalidator.middleware')

//Middleware
router.use('/',middlewareAdmin)
router.use('/', require('../middlewares/uservalidator.middleware').userexistencevalidator)


//Routes

/**
* @swagger
* /users/allusers:
*      get:
*          summary: Show all registred users in Delilah Resto (Admin restriction).
*          description: End point to show all registered users in Delilah Resto, this access only for administrator users
*          tags: [Users]
*          security: 
*                   - bearerAuth: []         
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
router.get('/allusers',  controller.allUsers);

/**
 * @swagger
 * /users/newuser:
 *      post:
*          summary: Create new user (Admin restriction).
*          description: End point to create a new user, this request is a JSON in the body and returns a JSON
*          tags: [Users]
*          security: 
*                   - bearerAuth: []  
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                     schema:
*                          $ref: '#/components/schemas/signIn'
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
router.post('/newuser', middlewareUser.repeatedemail,controller.createUser);

/**
 * @swagger
 * /users/userupdate/{id}:
 *      put:
*          summary: User information update (Admin restriction).
*          description:  In this end point requires in the parameters the user ID to be update and the JSON in the body with the update of the user information. Returns a JSON with updated user information. (administrator restriction).
*          tags: [Users]
*          security:
*                   - bearerAuth: []  
*          parameters:
*            - in: path
*              name: id
*              description: id del usuario
*              required: true
*              type: integer 
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                     schema:
*                          $ref: '#/components/schemas/userupdate'
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
router.put('/userupdate/:id', controller.userUpdate);



/**
 * @swagger
 * /users/userinactive/{id}:
 *      delete:
*          summary: User inactivation path(Admin restriction).
*          description: The endpoint requires a user id to deactivate, however, you cannot inactivate the admin user. Returns a text that announces the inactive user. 
*          tags: [Users]
*          security: 
*                   - bearerAuth: []  
*          parameters:
*            - in: path
*              name: id
*              description: User ID
*              required: true
*              type: integer         
*          responses:
*                  '201':
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
router.delete('/userinactive/:id', controller.userInactivate);

/**
 * @swagger
 * /users/useractive/{id}:
 *      put:
*          summary: User activation path(Admin restriction).
*          description: The endpoint requires a user id to activate, however, you cannot inactivate or activate the admin user. Returns a text that announces the active user. 
*          tags: [Users]
*          security: 
*                   - bearerAuth: []  
*          parameters:
*            - in: path
*              name: id
*              description: User ID
*              required: true
*              type: integer         
*          responses:
*                  '201':
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
router.put('/useractive/:id', controller.userActivate);

// -----Schemas Swagger-----

/**
 * @swagger
 * name: User register Schema
 * description: User model for registration by user admin. 
 * components:
 *  schemas:
 *      signIn:
 *          type: object
 *          required:
 *              -name
 *              -email
 *              -phone
 *              -password
 *              -repeatPassword
 *          properties:
 *              name:
 *                  type: string
 *                  example: Andres Lopez
 *                  description: user name and last name 
 *              email:
 *                  type: string
 *                  example: anflopezoc@gmail.com
 *                  description: email user
 *              phone: 
 *                  type: number
 *                  example: 3144455598
 *                  description: user phone
 *              password:
 *                  type: string
 *                  example: 12345
 *                  description: user password 
 *              repeatPassword:
 *                  type: string
 *                  example: 12345
 *                  description: user password repeat
 *                  
 */

/**
 * @swagger
 * name: User register Schema
 * description: User model for registration by user admin. 
 * components:
 *  schemas:
 *      userupdate:
 *          type: object
 *          required:
 *              -name
 *              -email
 *              -phone
 *              -password
 *              -repeatPassword
 *          properties:
 *              name:
 *                  type: string
 *                  example: Andres Felipe Lopez Ochoa
 *                  description: user name and last name 
 *              email:
 *                  type: string
 *                  example: anflopezoc@gmail.com
 *                  description: email user
 *              phone:
 *                  type: number
 *                  example: 3144567890
 *                  description: user phone
 *              password:
 *                  type: string
 *                  example: 12345
 *                  description: user password 
 *              repeatPassword:
 *                  type: string
 *                  example: 12345
 *                  description: user password repeat
 *                  
 */


module.exports = router;