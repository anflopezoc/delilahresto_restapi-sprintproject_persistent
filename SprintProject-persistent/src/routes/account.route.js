const express = require('express');
const router = express.Router();
const {allUsers, pushUsers} = require('../models/users.models');
const {newUserModel} = require('../models/orders.models');

//Mensaje bienvenida para el usuario.
/**
 * @swagger
 * /registro:
 *      get:
 *          summary: Bienvenida a Dalilah Restó
 *          description: Ver mensaje de bienvenida a Delilah Resto.
 *          tags: [Registro]
 *          security: []
 *          responses:
 *                  200:
 *                      description: creacion exitosa de la cuenta
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 *
 *                  400:
 *                      description: cuenta no creada
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */

router.get('/', (req,res) => {
    res.status(200).send('Bienvenido a Delilah Resto. Puedes registrarte para hacer pedidos desde nuestra REST-API de Delilah')
})

//El usuario puede registrarse, cuando crea su usuario a su vez crea un pedido vacío.
/**
 * @swagger
 * /registro:
 *      post:
 *          summary: Creación de cuenta en Delilah Restó.
 *          description: creacion de cuenta para hacer pedidos
 *          tags: [Registro]
 *          security: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                     schema:
 *                          $ref: '#/components/schemas/crearcuenta'
 *                     type: 
 *                          Array             
 *          responses:
 *                  '201':
 *                      description: creacion exitosa de la cuenta
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 *
 *                  400:
 *                      description: cuenta no creada
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */
router.post('/', (req,res) => {
    const {email, name, tel, adress,password} = req.body;
    const findEmail = allUsers().some(u => u.email === email );
    if (email && name && tel && adress && password) {
        if (findEmail == false){
                pushUsers(email,name, tel, adress, password);
                newUserModel(email,adress,tel)
                res.status(201).json('cuenta creada')
          
        } else return res.status(400).json('El email ya existe, por favor ingrese otro') 
    }else return res.status(400).json('Requerimientos incompletos')
         
});

//El usuario puede logearse/acceder a su cuenta desde este login.
/**
 * @swagger
 * /registro/login:
 *      post:
 *          summary: Acceder a su cuenta en Delilah Restó.
 *          description: acceso a cuenta para hacer pedidos
 *          tags: [Registro]
 *          security: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                     schema:
 *                          $ref: '#/components/schemas/login'
 *                     type: 
 *                          Array             
 *          responses:
 *                  '200':
 *                      description: acceso exitosa q su cuenta
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 *
 *                  400:
 *                      description: no fue exitoso el cceso a la cuenta
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */

router.post('/login', (req, res) => {
    const {email, password} = req.body;
    if (email && password) {
        if (allUsers().some( u => u.email === email && u.password === password)){
            res.status(200).send('Su acceso es exitoso')
        } else return res.status(400).send('Email o contraseña incorrecto')
    }else return res.status(400).send('Requerimientos incompletos')
})

// -----Schemas Swagger-----

/**
 * @swagger
 * name: Registo de usuario
 * description: formato para crear cuenta.
 * components:
 *  schemas:
 *      crearcuenta:
 *          type:   object
 *          required:
 *              -email
 *              -name
 *              -tel
 *              -adress
 *              -password
 *          properties:
 *              email:
 *                  type: string
 *                  example: prueba@gmail.com
 *                  description: correo electrónico del usuario
 *              name:
 *                  type: string
 *                  example: Prueba Alberto Petardo
 *                  description: nombres y apellidos del usuario
 *              tel:
 *                  type: number
 *                  example: 5198811
 *                  description: numero telefónico
 *              adress:
 *                  type: string
 *                  example: calle 111 N 11-11
 *                  description: direccion del usuario.
 *              password:
 *                  type: string
 *                  example: 12345
 *                  description: contrasenia para el acceso a la cuenta del usuario
 *          
 *                  
 */

/**
 * @swagger
 * name: Registo de usuario
 * description: formato para crear cuenta.
 * components:
 *  schemas:
 *      login:
 *          type:   object
 *          required:
 *              -email
 *              -password
 *          properties:
 *              email:
 *                  type: string
 *                  example: prueba@gmail.com
 *                  description: correo electrónico del usuario
 *              password:
 *                  type: string
 *                  example: 12345
 *                  description: contrasenia para el acceso a la cuenta del usuario
 *          
 *                  
 */

module.exports = router