const express = require('express');
const router = express.Router();
const controller = require('../controllers/users.controller');
const middlewareAdmin = require('../middlewares/adminvalidator.middleware').adminvalidator;
const middlewareUser = require('../middlewares/uservalidator.middleware')

//Middleware
router.use('/',middlewareAdmin)
router.use('/', require('../middlewares/uservalidator.middleware').userexistencevalidator)


//Routes

router.get('/allusers',  controller.allUsers);

/**
 * @swagger
 * /users/newuser:
 *      post:
*          summary: Account creation in Delilah Restó from Users Path (Admin).
*          description: Account creation endpoint from Users Path (Admin restriction). Return a JSON with user information created
*          tags: [Users]
*          security: []
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                     schema:
*                          $ref: '#/components/schemas/signIn'
*                     type: 
*                          object             
*          responses:
*                  '201':
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
 *      post:
*          summary: User information update (Admin).
*          description:  Enter the id of the user that you want to update (Admin restriction). Return a JSON with user information updated
*          tags: [Users]
*          security: []
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
*                          $ref: '#/components/schemas/signIn'
*                     type: 
*                          object             
*          responses:
*                  '201':
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
 * /users/userupdate/{id}:
 *      post:
*          summary: User information update (Admin).
*          description:  Enter the id of the user that you want to update (Admin restriction). Return a JSON with user information updated
*          tags: [Users]
*          security: []
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
*                          $ref: '#/components/schemas/signIn'
*                     type: 
*                          object             
*          responses:
*                  '201':
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*
*                  404:
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
 */
router.delete('/userinactive/:id', controller.userInactivate);


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
 *                  example: Felipe Ochoa
 *                  description: user name and last name 
 *              email:
 *                  type: string
 *                  example: sonoandreslopez@gmail.com
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
 *                  
 */

module.exports = router;