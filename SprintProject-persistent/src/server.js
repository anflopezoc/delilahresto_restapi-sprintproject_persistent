const express = require('express');
const app = express();
const config = require('./config/config')
const eJWT = require('./middlewares/expressJWT')
const helmet = require('helmet');
const PORT = parseInt(config.module.PORT) || 3000;
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

//DB
require('./DB/db')

//Swagger
const swaggerOptions = require('./utils/swaggerOptions');
const swaggerSpecs = swaggerJsDoc(swaggerOptions);
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

//Middlewares
app.use(express.json());
app.use(helmet())
app.use(eJWT.midexJWT, eJWT.valitorJWT);


//Rutes Access
app.use('/account', require('./routes/account.route'));
app.use('/users', require('./routes/users.route'));
app.use('/products', require('./routes/products.route'));
app.use('/addresses', require('./routes/addresses.route'));
app.use('/payments', require('./routes/payment.route'));
app.use('/orders', require('./routes/orders.route'));
app.use('/ordermanagement', require('./routes/ordermanagement.route'));

//Server Port
app.listen(PORT, () => {console.log(`listen port ${PORT}`);})

module.exports = app;



