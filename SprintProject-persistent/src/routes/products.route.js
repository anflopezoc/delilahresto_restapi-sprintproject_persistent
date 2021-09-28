const express = require('express');
const router = express.Router();
const {allUsers} = require('../models/users.models');
const {AllProducts, pushProduct } = require('../models/products.models');


//Middleware que verifica si es Admin el usuario logeado, solo puede acceder a estas rutas un Admin.
router.use('/', (req,res,next) => {
    if (allUsers().some(u => u.email === req.auth.user && u.isAdmin == true)== false) 
    return res.status(401).json('No está autorizado') 
    else return next() 
});

//Ver todos los productos. 
/**
 * @swagger
 * /productos:
 *      get:    
 *          summary: Ver todos los productos de Dalilah Restó
 *          description: Trae todo todos los productos de Dalilah Restó
 *          tags: [Productos]
 *          security:
 *              - basicAuth: []
 *          responses:
 *                  200:
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */

router.get('/', (req, res) => {
    res.json(AllProducts())
});


//Ver el producto con este ID
/**
 * @swagger
 * /productos/{id}:
 *      get:    
 *          summary: Ver un producto en oferta en Dalilah Restó
 *          description: Trae un producto en oferta en Dalilah Restó por id del producto.
 *          tags: [Productos]
 *          security:
 *              - basicAuth: []
 *          parameters:
 *            - in: path
 *              name: id
 *              description: id del producto
 *              required: true
 *              type: integer    
 *          responses:
 *                  200:
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */
router.get('/:id', (req, res) => {
    if (AllProducts().some(u => u.id == req.params.id)){
        const {id} = req.params;
        const filtro = AllProducts().find(u => u.id == id);
        res.json(filtro)
    } else res.json("El producto no existe")

});

//Crea un nuevo producto
/**
 * @swagger
 * /productos:
 *      post:    
 *          summary: Agregar producto para oferta en Dalilah Restó
 *          description: Agrega un producto para oferta en Dalilah Restó por id del producto.
 *          tags: [Productos]
 *          security:
 *              - basicAuth: []
 *          requestBody:
 *              require: true
 *              content:
 *                  application/json:
 *                      schema:
 *                        $ref: '#/components/schemas/products' 
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
router.post('/', (req, res) => {
    const {productName,price,description} = req.body
    if (AllProducts().some(u => u.productName == productName)){
        return res.status(400).json("El producto ya existe en la oferta.")}
    else {
        if (productName && price&& description) {
            pushProduct(productName,price,description)
            res.status(201).json(AllProducts());   
        } else return res.status(400).json("Datos incompletos, debe ingresar un nombre de producto, precio y descripción" ) 
    }
    

})

//Modificar el producto.
/**
 * @swagger
 * /productos/{id}:
 *      put:    
 *          summary: Modifica un producto en oferta en Dalilah Restó
 *          description: Modifica un producto en oferta en Dalilah Restó por id del producto.
 *          tags: [Productos]
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
 *                        $ref: '#/components/schemas/products' 
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
router.put('/:id', (req, res) => {
    const  product = AllProducts().find( u => u.id == req.params.id);
    const {productName, price,description} = req.body;
    if (!AllProducts().some( u => u.id == req.params.id)){
        return res.status(400).json("El producto no existe en la oferta.")
    } else {
        if (productName && price&& description){
            product.productName = productName;
            product.price = price;
            product.description = description;
            res.json(AllProducts());
        } else return res.status(400).json("Datos incompletos, debe ingresar un nombre de producto, precio y descripción" )    
    }
});

//Elimina un producto.
/**
 * @swagger
 * /productos/{id}:
 *      delete:    
 *          summary: Elimina un producto en oferta en Dalilah Restó
 *          description: Elimina un producto en oferta en Dalilah Restó por id del producto.
 *          tags: [Productos]
 *          security:
 *              - basicAuth: []
 *          parameters:
 *            - in: path
 *              name: id
 *              description: id del producto a eliminar.
 *              required: true
 *              type: integer    
 *          responses:
 *                  200:
 *                      content:
 *                          'aplication/json': {}
 *                          'aplication/xml': {}
 */
router.delete('/:id', (req, res) => {
    if (!AllProducts().some(u => u.id== req.params.id)){
        return res.status(400).json("El producto no existe en la oferta.")}
    else {
        const  product = AllProducts().find( u => u.id == req.params.id);
        AllProducts().splice(AllProducts().lastIndexOf(product),1);
        res.status(200).json( AllProducts());
        console.log('Producto eliminado')
    }
});


// -----Schemas Swagger-----


/**
 * @swagger
 * name: Agregar o Modificar Productos
 * description: Modelo para añadir o modificar  productos.
 * components:
 *  schemas:
 *      products:
 *          type: object
 *          required:
 *              -productName
 *              -price
 *              -description
 *          properties:
 *              productName:
 *                  type: string
 *                  example: string
 *                  description: nombre del producto
 *              price:
 *                  type: number
 *                  example: number
 *                  description: precio del producto
 *              description:
 *                  type: string
 *                  example: string
 *                  description: nombre del producto
 * 
 */


module.exports = router