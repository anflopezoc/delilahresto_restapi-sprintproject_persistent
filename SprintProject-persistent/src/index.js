const express = require('express');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const basicAuth = require('express-basic-auth');
app.use(express.json());

//Swagger
const swaggerOptions = require('./utils/swaggerOptions');
const swaggerSpecs = swaggerJsDoc(swaggerOptions);
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

//Sing Up
app.use('/registro', require('./routes/account.route'));

//Middlewares
const {autentication} = require('./middlewares/autenticacion.middleware');
app.use(basicAuth({authorizer: autentication}));


//Routes
app.use('/usuarios', require('./routes/user.route'));
app.use('/productos', require('./routes/products.route'));
app.use('/orden', require('./routes/orders.route'));
app.use('/admin', require('./routes/admin.route'))

//Server
app.listen(3000, console.log('Escuchando puerto 3000'));