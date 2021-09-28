const express = require('express');
const router = express.Router();
const {allOrders, newUserModel, userUpdate, filterPP, orderCostUpdate, allPay, allStates} = require('../models/orders.models');
const {allUsers} = require('../models/users.models');
const {AllProducts, pushProduct } = require('../models/products.models');
const {getUnauthorizedResponse} = require('../middlewares/autenticacion.middleware')



//Ver la orden  del usuario que está pendiente.
/**
 * @swagger
 * /orden:
 *      get:
 *          summary: Ver orden de usuario.
 *          description: Ver la orden del usuario logeado en estado pendiente.
 *          tags: [Orden]
 *          security:
 *              - basicAuth: []
 *          responses:
 *                  200:
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */
router.get('/',(req,res)=>{
    const user = req.auth.user; 
    const filter = allOrders().find(u => u.username == user && u.state == 'Pendiente' )
    res.status(200).json(filter)
});

//Trae todos los productos para que pueda visualizarlos antes de añadirlos a la orden.
/**
 * @swagger
 * /orden/productos:
 *      get:
 *          summary: Ver productos para añadir a la orden.
 *          description: Ver los productos para añadir a la orden.
 *          tags: [Orden]
 *          security:
 *              - basicAuth: []
 *          responses:
 *                  200:
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */
router.get('/productos',(req,res) => {
    const user = req.auth.user;
    res.status(200).json(AllProducts())
});

//Ver todos los productos que están en su orden.
/**
 * @swagger
 * /orden/productosorden:
 *      get:
 *          summary: Ver pedidos de orden.
 *          description: Ver los productos que están en la orden.
 *          tags: [Orden]
 *          security:
 *              - basicAuth: []
 *          responses:
 *                  200:
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */
router.get('/productosorden',(req,res) => {
    const user = req.auth.user;
    const filtro = allOrders().find(u => u.username == user && u.state == 'Pendiente')
    res.json(filtro.order)
    
});

//Agrega un producto a la orden.
//Verifica si el producto existe en el producto, si es así, le suma a la cantidad (q), de lo contrario lo agrega como otro elemento de array.
/**
 * @swagger
 * /orden/productosorden/{id}:
 *      post:
 *          summary: Añadir producto a orden.
 *          description: Método para agregar productos a la orden del usuario.
 *          tags: [Orden]
 *          security:
 *              - basicAuth: []
 *          parameters:
 *            - in: path
 *              name: id
 *              description: id del producto a agregar
 *              required: true
 *              type: integer       
 *          responses:
 *                  '200':
 *                      description: Producto agregado exitosamente.
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 *
 *                  400:
 *                      description: No existe el producto.
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */
router.post('/productosorden/:id',(req,res) => {
    const product = AllProducts().find(u => u.id == req.params.id);
    const filter = allOrders().find(u => u.username == req.auth.user && u.state == 'Pendiente');
    if (AllProducts().some(u => u.id == req.params.id)){
        if (filter.order.some(u => u.id == product.id) == true){
            const productTrue= filter.order.find(u => u.id == req.params.id);
            productTrue.q += 1;
        } else {filter.order.push(product)};
        orderCostUpdate(filter);
        res.status(201).json(allOrders().find(u => u.username == req.auth.user && u.state == 'Pendiente'))
    } else res.status(400).json('El producto no existe')
});


//Elimina un producto a la orden.
//Verifica si el producto existe en el producto, si es así, le suma a la cantidad (q), de lo contrario lo agrega como otro elemento de array.
/**
 * @swagger
 * /orden/productosorden/{id}:
 *      delete:
 *          summary: Elimina producto a orden.
 *          description: Método para eliminar productos a la orden del usuario.
 *          tags: [Orden]
 *          security:
 *              - basicAuth: []
 *          parameters:
 *            - in: path
 *              name: id
 *              description: id del producto a agregar
 *              required: true
 *              type: integer       
 *          responses:
 *                  '201':
 *                      description: Producto eliminado de la orden exitosamente.
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 *
 *                  400:
 *                      description: No existe el producto.
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */
router.delete('/productosorden/:id',(req,res) => {
    const product = AllProducts().find(u => u.id == req.params.id);
    const filter = allOrders().find(u => u.username == req.auth.user && u.state == 'Pendiente');  
    const productTrue= filter.order.find(u => u.id == req.params.id);
    if (filter.order.some(u => u.id == req.params.id) == true) {
        if (filter.order.find(u => u.id == product.id).q > 1){
            productTrue.q = productTrue.q-1;
            orderCostUpdate(filter);
            res.status(200).json(allOrders().find(u => u.username == req.auth.user && u.state == 'Pendiente'));  
        } else if (filter.order.find(u => u.id == product.id).q = 1) {
            filter.order.splice(filter.order.lastIndexOf(productTrue),1);
            orderCostUpdate(filter);
            res.status(200).json(allOrders().find(u => u.username == req.auth.user && u.state == 'Pendiente'));
        }
    } else {
        res.status(400).json('El producto no está en la orden.')
    }
});



//Ver todos los medios de pago disponibles.
/**
 * @swagger
 * /orden/metodospago:
 *      get:
 *          summary: Ver métodos de pago
 *          description: Ver los métodos de pago disponibles.
 *          tags: [Orden]
 *          security:
 *              - basicAuth: []
 *          responses:
 *                  200:
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */
router.get('/metodospago',(req,res) => {
    res.json(allPay())
});

//Agrega un producto a la orden.
//Verifica si el producto existe en el producto, si es así, le suma a la cantidad (q), de lo contrario lo agrega como otro elemento de array.
/**
 * @swagger
 * /orden/metodospago/{id}:
 *      put:
 *          summary: Agregar método de pago a orden
 *          description: Agregar metodo de pago a la orden antes de confirmar.
 *          tags: [Orden]
 *          security:
 *              - basicAuth: []
 *          parameters:
 *            - in: path
 *              name: id
 *              description: id del producto a agregar
 *              required: true
 *              type: integer       
 *          responses:
 *                  '200':
 *                      description: Método de pago agregado exitosamente.
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 *
 *                  400:
 *                      description: El método de pago no existe.
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */
router.put('/metodospago/:id',(req,res) => {
    const pay = allPay().find(u => u.id == req.params.id);
    const filter = allOrders().find(u => u.username == req.auth.user); 
    if (allPay().some(u => u.id == req.params.id)){
        filter.pay = pay.method;
        res.json(filter)
    } else res.status(400).json('No existe este método de pago')
});


//Permite cambiar la dirección que viene por defecto del usuario.
/**
 * @swagger
 * /orden/cambiodireccion/:
 *      put:
 *          summary: Cambiar dirección de orden
 *          description: Cambio de dirección de la orden diferente al que viene por defecto del usuario.
 *          tags: [Orden]
 *          security:
 *              - basicAuth: []
 *          requestBody:
 *              require: true
 *              content:
 *                  application/json:
 *                      schema:
 *                        $ref: '#/components/schemas/direccion' 
 *                      type:
 *                          Array       
 *          responses:
 *                  '200':
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 *
 *                  400:
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */
router.put('/cambiodireccion',(req,res) => {
    const {adress} = req.body;
    const filter = allOrders().find(u => u.username == req.auth.user); 
    filter.adress = adress;
    res.status(200).json(filter)
})

//Confirma el pedido y a su vez crea un nuevo pedido desde cero. 
//Solo debe existir un solo pedido en estado pendiente, por eso mismo hago push con la función newUserModel.
//Se plantea evitar preguntarle a Usuarios si desea crear un pedido, siempre tendrá un pedido limpio para ordenar.
/**
 * @swagger
 * /orden/confirmarorden/:
 *      put:
 *          summary: Confirmar orden
 *          description: Confirmar orden para cerrar el pedido.
 *          tags: [Orden]
 *          security:
 *              - basicAuth: []
 *          requestBody:
 *              require: true
 *              content:
 *                  application/json:
 *                      schema:
 *                        $ref: '#/components/schemas/confirmarorden' 
 *                      type:
 *                          Array       
 *          responses:
 *                  '200':
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 *
 *                  400:
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */
router.put('/confirmarorden/',(req,res) => {
    const {state} = req.body;
    const filter = allOrders().find(u => u.username == req.auth.user && u.state == 'Pendiente');
    if(filter.order.length<1) {res.status(400).json("No hay productos agregados en la orden");}
    else {
        if (state == "Si"  || state == "Sí" || state == "si"  || state == "sí") {
            filter.state = "Confirmado";
            res.status(201).json('Gracias por tu compra, pronto será despachada tu orden');
            newUserModel(filter.username,filter.adress,filter.tel)          
        } else if (state == "No" || state == "no"){
            res.json('Puedes continuar agegando productos a tu orden');
        } else res.status(400).json('Respuesta incorrecta')
    }
    
});

//Ver ordenes relacionados al usuario logeado.
/**
 * @swagger
 * /orden/historial:
 *      get:
 *          summary: Ver historial de ordenes de usuario
 *          description: Trae todo el historial de ordenes del usuario.
 *          tags: [Orden]
 *          security:
 *              - basicAuth: []
 *          responses:
 *                  200:
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */
router.get('/historial',(req,res)=>{
    const user = req.auth.user;
    const filter = allOrders().filter(u => u.username == user)
    res.status(200).json(filter)
});

// -----Schemas Swagger-----

/**
 * @swagger
 * name: Confirmar Pedido
 * description: formato para confirmar o no pedido
 * components:
 *  schemas:
 *      confirmarorden:
 *          type:   object
 *          required:
 *              -state
 *          properties:
 *              state:
 *                  type: string
 *                  example: si/no
 *                  description: responde si o no para confirmar o no la orden.*                  
 *          
 */

/**
 * @swagger
 * name: Cambiar direccion
 * description: Modelo de cambio de dirección por parte del usuario
 * components:
 *  schemas:
 *      direccion:
 *          type:   object
 *          required:
 *              -adress
 *          properties:
 *              adress:
 *                  type: string
 *                  example: calle 111 #111-1111
 *                  description: Agrega una dirección nueva.
 *                   
 *          
 */

module.exports = router