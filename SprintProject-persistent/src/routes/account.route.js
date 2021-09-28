const express = require('express');
const router = express.Router();
const controller = require('../controllers/account.controller')
const middlewareUser = require('../middlewares/uservalidator.middleware')

//Routes
 
/**
 * @swagger
 * /account/register:
 *      post:
*          summary: Account creation in Delilah Restó.
*          description: Account creation endpoint. Return a JSON with user information created
*          tags: [Account]
*          security: []
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                     schema:
*                          $ref: '#/components/schemas/signInAccount'
*                     type: 
*                          object             
*          responses:
*                  '201':
*                      description: creacion exitosa de la cuenta
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*
*                  404:
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
 */
router.post('/register',middlewareUser.repeatedemail, controller.signUser);




/**
 * @swagger
 * /account/login:
 *      post:
 *          summary: Log in Delilah Restó.
 *          description: log in to Delilag Restó. Return the user token.
 *          tags: [Account]
 *          security: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                     schema:
 *                          $ref: '#/components/schemas/login'
 *                     type: 
 *                          object             
 *          responses:
 *                  '200':
 *      
 *                      content: 
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 *
 *                  400:                
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */
router.post('/login', controller.login);

// -----Schemas Swagger-----

/**
 * @swagger
 * name: Registo de usuario
 * description: formato para crear cuenta.
 * components:
 *  schemas:
 *      signInAccount:
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
 *                  example: Erick Wollf
 *                  description: user name and last name 
 *              email:
 *                  type: string
 *                  example: erickwollf@gmail.com
 *                  description: email user
 *              phone:
 *                  type: number
 *                  example: 3144499976
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
 *                  
 */

/**
 * @swagger
 * name: user login
 * description: login format for users.
 * components:
 *  schemas:
 *      login:
 *          type: object
 *          required:
 *              -email
 *              -password
 *          properties:
 *              email:
 *                  type: string
 *                  example: erickwollf@gmail.com
 *                  description: correo electrónico del usuario
 *              password:
 *                  type: string
 *                  example: 12345
 *                  description: contrasenia para el acceso a la cuenta del usuario
 *          
 *                  
 */
module.exports =router;
