const express = require('express');
const router = express.Router();
const controller = require('../controllers/products.controller');

//Middleware
router.use('/', require('../middlewares/uservalidator.middleware').userexistencevalidator)
const middlewareAdmin = require('../middlewares/adminvalidator.middleware').adminvalidator;
const {cache, client}= require('../middlewares/redis.middleware');

//Routes Products

/**
* @swagger
* /products/allproducts:
*      get:
*          summary: Show all products.
*          description: End point to show all offer of products in Delilah Resto (Any user can to use this path).
*          tags: [Products]
*          security: 
*                   - bearerAuth: []         
*          responses:
*                  '200':
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*                  '404':
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*/
router.get('/allproducts', cache, controller.getproducts);

/**
* @swagger
* /products/newproduct:
*      post:
*          summary: Create a new product.
*          description: End point to create a new products in Delilah Resto offer.
*          tags: [Products]
*          security: 
*                   - bearerAuth: []
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                     schema:
*                          $ref: '#/components/schemas/productModel'
*                     type: 
*                          object        
*          responses:
*                  '200':
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*                  '404':
*                      content:
*                          'aplication/json': {}
*                          'aplication/xml': {}
*/
router.post('/newproduct', middlewareAdmin, controller.newproduct, cache);

/**
* @swagger
* /products/productupdate/{id}:
*      put:
*          summary: Update product.
*          description: End point to update the product in Delilah Resto offer. It requires the Product Id in the path and returns a string notifying "Product with ID ## has been updated".
*          tags: [Products]
*          security: 
*                   - bearerAuth: []
*          parameters:
*            - in: path
*              name: id
*              description: Product ID.
*              required: true
*              type: integer 
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                     schema:
*                          $ref: '#/components/schemas/productModel'
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
router.put('/productupdate/:id', middlewareAdmin, controller.productUpdate, cache);
/**
* @swagger
* /products/productinactive/{id}:
*      delete:
*          summary: Inactive product.
*          description: End point to inactive the product in Delilah Resto offer. It requires the Product Id in the path and returns a string notifying "Product with ID ## has been inactivated".
*          tags: [Products]
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
router.delete('/productinactive/:id', middlewareAdmin, controller.inactiveproduct, cache);

/**
* @swagger
* /products/productactive/{id}:
*      put:
*          summary: Inactive product.
*          description: End point to active the product in Delilah Resto offer. It requires the Product Id in the path and returns a string notifying "Product with ID ## has been activated".
*          tags: [Products]
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
router.put('/productactive/:id', middlewareAdmin, controller.activeproduct, cache);
module.exports = router;

// -----Schemas Swagger-----

/**
 * @swagger
 * name: Products model.
 * description: Model for creating or updating products.
 * components:
 *  schemas:
 *        productModel:
 *          type: object
 *          required:
 *              -productName
 *              -price
 *          properties:
 *              productName:
 *                  type: string
 *                  example: Pastas con Salsa a la Bolognesa
 *                  description: product name model.
 *              price:
 *                  type: number
 *                  example: 25000
 *                  description: price of product model
 *                  
 */