const express = require('express');
const router = express.Router();
const {allOrders,newPay,allPay, allStates,deletePay} = require('../models/orders.models');
const {allUsers} = require('../models/users.models');


//--------------------Gestión de Estados del Pedido (Solo Admin)--------------




//Middleware que verifica si es Admin el usuario logeado, solo puede acceder a estas rutas un Admin.
router.use('/', (req,res,next) => {
    if (allUsers().some(u => u.email === req.auth.user && u.isAdmin == true)== false) 
    return res.status(401).json('No está autorizado') 
    else return next() 
});

//Ver todos los pedidos, solo Admin.
/**
 * @swagger
 * /admin/orders:
 *      get:
 *          summary: Historial de ordenes de todos los usuarios.
 *          description: Ver todo el historial de ordenes de Delilah Restó.
 *          tags: [Gestión de Ordenes]
 *          security:
 *              - basicAuth: []
 *          responses:
 *                  200:
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */
router.get('/orders',(req,res)=>{
    res.status(200).json(allOrders())
});

//Permite ver todos los tipos de estados para pedidos.
/**
 * @swagger
 * /admin/ordersstates:
 *      get:
 *          summary: Ver los tipos de estados para ordenes.
 *          description: Ver los tipos de estados para modificar el estado de una orden.
 *          tags: [Gestión de Ordenes]
 *          security:
 *              - basicAuth: []
 *          responses:
 *                  200:
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */
router.get('/ordersstates',(req,res)=>{
    res.status(200).json(allStates())
});

//Modifica el estado del pedido, solo Admin.
/**
 * @swagger
 * /admin//ordersstates/{id}/state/{idState}:
 *      put:
 *          summary: Modificar estado de orden confirmada.
 *          description: Cambia el estado de la orden
 *          tags: [Gestión de Ordenes]
 *          security:
 *              - basicAuth: []
 *          parameters:
 *            - in: path
 *              name: id
 *              description: id de la orden a seleccionar.
 *              required: true
 *              type: integer 
 *            - in: path
 *              name: idState
 *              description: id del Estado a relacionar a la orden seleccionada.
 *              required: true
 *              type: integer        
 *          responses:
 *                  '200':
 *                      description: Cambio exitoso de estado de la orden
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 *
 *                  400:
 *                      description: No se pudo cambiar el pedido.
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */

router.put('/ordersstates/:id/state/:idState',(req,res) => {
    const order = allOrders().find(u => u.id == req.params.id)
    const state = allStates().find(u => u.id == req.params.idState)
        if (order.state == "Pendiente") {
            res.status(400).json("No puede modificar una orden en estado pendiente, debes esperar a que el usuario lo confirme.")
        } else {
            if (allOrders().some(u => u.id == req.params.id)){
                if (allStates().some(u => u.id == req.params.idState)){
                    if (state.id == 1 ){
                        res.json("No puede devolver el pedido a pendiente, el usuario ya lo ha confirmado.")
                    } else
                    order.state = state.mode
                    res.json(order)
                } else res.status(400).json("El estado no existe")
            }else res.status(400).json("La orden no existe")
        }
})




//----------------------Gestión de medios de pago-----------------------------




//Ver todos los medios de pago
/**
 * @swagger
 * /admin/allpaymethods:
 *      get:
 *          summary: Todos los métodos de pago.
 *          description: Ver todos los métodos de pago disponibles.
 *          tags: [Métodos de Pago]
 *          security:
 *              - basicAuth: []
 *          responses:
 *                  201:
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */
router.get('/allpaymethods', (req,res) => {
    res.status(200).json(allPay())
})

//Agrega un nuevo medio de pago
/**
 * @swagger
 * /admin/newpaymethod/:
 *      post:
 *          summary: Agregar método de pago.
 *          description: Permitir agregar un nuevo método de pago con el id correspondiente.
 *          tags: [Métodos de Pago]
 *          security:
 *              - basicAuth: []
 *          requestBody:
 *              require: true
 *              content:
 *                  application/json:
 *                      schema:
 *                        $ref: '#/components/schemas/methodpage' 
 *                      type:
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
router.post('/newpaymethod', (req,res) => {
    const {method} =req.body;
    if(allPay().some(u => u.method == method)){
       return res.status(400).send('El método de pago ya existe') 
    } else 
        newPay(method)
        res.status(200).json(allPay())
});


//Ver el método de pago
/**
 * @swagger
 * /admin/paymethod/{id}:
 *      get:
 *          summary: Ver método de pago.
 *          description: Ver el métodos de pago con el id correspondiente.
 *          tags: [Métodos de Pago]
 *          security:
 *              - basicAuth: []
 *          parameters:
 *            - in: path
 *              name: id
 *              description: id del producto a agregar
 *              required: true
 *              type: integer  
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
router.get('/paymethod/:id', (req,res) => {
    const {id} = req.params;
    const  methodPay = allPay().find( u => u.id == id)
    if(allPay().some(u => u.id == id)) res.status(200).json(methodPay);
     else  res.status(400).json('El método de pago no existe.')
});

//Modifica el método de pago.
/**
 * @swagger
 * /admin/paymethod/{id}:
 *      put:
 *          summary: Modificar método de pago.
 *          description: Permitir modificar el método de pago con el id correspondiente.
 *          tags: [Métodos de Pago]
 *          security:
 *              - basicAuth: []
 *          parameters:
 *            - in: path
 *              name: id
 *              description: id del producto a modificar
 *              required: true
 *              type: integer
 *          requestBody:
 *              require: true
 *              content:
 *                  application/json:
 *                      schema:
 *                        $ref: '#/components/schemas/methodpage' 
 *                      type:
 *                          Array    
 *          responses:
 *                  200:
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */
router.put('/paymethod/:id', (req,res) => {
    const {id} = req.params
    const  methodPay = allPay().find( u => u.id == id)
    const {method} =req.body;
    if(allPay().some(u => u.id == id)){
        methodPay.method = method;
        res.status(200).json(allPay())
    } else  res.status(400).json('El método de pago no existe.') 
  
})

//Elimina el método de pago
/**
 * @swagger
 * /admin/paymethod/{id}:
 *      delete:
 *          summary: Eliminar método de pago.
 *          description: Eliminar el métodos de pago con el id correspondiente.
 *          tags: [Métodos de Pago]
 *          security:
 *              - basicAuth: []
 *          parameters:
 *            - in: path
 *              name: id
 *              description: id del producto a eliminar
 *              required: true
 *              type: integer  
 *          responses:
 *                  200:
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */
router.delete('/paymethod/:id', (req,res) => {
    const {id} = req.params
    if(allPay().some(u => u.id == id))res.status(200).json(deletePay(id));
    else res.status(400).json('El método de pago no existe.') 
});


// -----Schemas Swagger-----

/**
 * @swagger
 * name: Modificar o agregar método de pago
 * description: Formato para modificar método de pago
 * components:
 *  schemas:
 *      methodpage:
 *          type:   object
 *          required:
 *              -method
 *          properties:
 *              method:
 *                  type: string
 *                  example: Nequi
 *                  description: Ejemplo para método de pago por body.                  
 *          
 */
module.exports = router