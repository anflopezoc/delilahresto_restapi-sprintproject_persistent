const express = require('express');
const router = express.Router();
const {allUsers, pushUsers, putUsers} = require('../models/users.models');
const {newUserModel} = require('../models/orders.models');


//Middleware que verifica si es Admin el usuario logeado, solo puede acceder a estas rutas un Admin.
router.use('/',(req,res,next) => {
    if (allUsers().some(u => u.email === req.auth.user && u.isAdmin)) 
    return next()
    else return res.status(401).json('No está autorizado')  
}); 

//Trae todos los usuarios, solo Admin.
/**
 * @swagger
 * /usuarios:
 *      get:
 *          summary: Ver todos los usuarios.
 *          description: Ver todos los usuarios registrados en Delilah Restó.
 *          tags: [Usuarios]
 *          security:
 *              - basicAuth: []
 *          responses:
 *                  201:
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */
router.get('/', (req, res) => {
     res.json(allUsers())
});

//Trae el usuario con el id en Params, solo Admin.
/**
 * @swagger
 * /usuarios/{id}:
 *      get:
 *          summary: Ver usuario por ID.
 *          description: Ver un solo usuario registrado en Delilah Restó por su id.
 *          tags: [Usuarios]
 *          security:
 *              - basicAuth: []
 *          parameters:
 *            - in: path
 *              name: id
 *              description: id del usuario
 *              required: true
 *              type: integer 
 *          responses:
 *                  201:
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */
router.get('/:id',(req, res) => {
    const {id} = req.params;
    const filtro = allUsers().find(u => u.id == id)
    res.json(filtro)
});

//Crea Usuario desde el usuario Admin.
/**
 * @swagger
 * /usuarios:
 *      post:
 *          summary: Agregar usuario.
 *          description: Agregar usuario por medio de Admin en Delilah Restó.
 *          tags: [Usuarios]
 *          security:
 *              - basicAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                     schema:
 *                          $ref: '#/components/schemas/crearcuenta'
 *                     type: 
 *                          Array 
 *          responses:
 *                  201:
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 *                  400:
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */
router.post('/',(req, res) => {
    const {email, name, tel, adress,password} = req.body;
    const findEmail = allUsers().some(u => u.email === email );
    if (email && name && tel && adress && password) {
        if (findEmail == false){
                pushUsers(email,name, tel, adress, password);
                newUserModel(email,adress,tel)
                res.status(201).json('cuenta creada')
        } else return res.status(400).json('El email ya existe, por favor ingrese otro') 
    }else return res.status(400).json('Requerimientos incompletos')
    
})

//Modifica un usuario desde Admin.
/**
 * @swagger
 * /usuarios/{id}:
 *      put:
 *          summary: Modificar usuario por ID.
 *          description: Modificar un solo usuario registrado en Delilah Restó por su id.
 *          tags: [Usuarios]
 *          security:
 *              - basicAuth: []
 *          parameters:
 *            - in: path
 *              name: id
 *              description: id del usuario a modificar
 *              required: true
 *              type: integer 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                     schema:
 *                          $ref: '#/components/schemas/crearcuenta'
 *                     type: 
 *                          Array
 *          responses:
 *                  200:
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 *                  400:
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */
router.put('/:id', (req, res) => {
    const {email, name, tel, adress,password} = req.body;
    if (allUsers().some( u => u.id == req.params.id)) {
        if (email && name && tel && adress && password) {
            putUsers(req.params.id,email,name, tel, adress, password);
            res.json(allUsers().find(u => u.id == req.params.id));
        } else return res.status(400).json('Requerimientos incompletos')   
    } else return res.status(400).json('El usuario con este id no existe.')
        
        
    
});

//Elimina el usuario con id del params, solo Admin. 
/**
 * @swagger
 * /usuarios/{id}:
 *      delete:
 *          summary: Eliminar usuario por ID.
 *          description: Eliminar un solo usuario registrado en Delilah Restó por su id.
 *          tags: [Usuarios]
 *          security:
 *              - basicAuth: []
 *          parameters:
 *            - in: path
 *              name: id
 *              description: id del usuario
 *              required: true
 *              type: integer 
 *          responses:
 *                  201:
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */
router.delete('/:id', (req, res) => {
    const user = allUsers().find(u => u.id == req.params.id);
    if(!allUsers().some(u => u.id == req.params.id)){
        return res.status(400).json("El usuario con el id indicado no existe")
    } else {
        if(user.isAdmin == false){
            allUsers().splice(allUsers().lastIndexOf(user),1);
            res.json(allUsers());
            console.log('Usuario eliminado')
        } else return res.status(400).json("No puedes eliminar el usuario admin")
    }
   
});


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
 *                  example: Prueba Alberto Ejemplo
 *                  description: nombres y apellidos del usuario
 *              tel:
 *                  type: number
 *                  example: 5198811
 *                  description: numero telefónico
 *              adress:
 *                  type: string
 *                  example: calle 111 N111-1111
 *                  description: direccion del usuario.
 *              password:
 *                  type: string
 *                  example: 12345
 *                  description: contrasenia para el acceso a la cuenta del usuario
 *          
 *                  
 */

module.exports = router