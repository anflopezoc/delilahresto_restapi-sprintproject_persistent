const express = require('express');
const app = express();
const config = require('./config/config')
const eJWT = require('./middlewares/expressJWT')
const helmet = require('helmet');
const cors = require('cors')
const PORT = parseInt(config.module.PORT) || 3000;
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const passport = require('passport')
const public_routes = require('./routes/public')
const auth_routes = require('./routes/auth/index')
require('./services')

const environment = process.env.NODE_ENV;
const apiDescription = process.env.API_DESCRIPTION;
//DB
require('./DB/db')

// Add headers before the routes are defined
app.use(cors());
app.use(passport.initialize())

app.use(public_routes);
app.use(auth_routes);


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
app.listen(PORT, () => {
	console.log(`Server in Port ${PORT}`);
	console.log(`The application is running in the '${environment}' enviroment`);
        console.log(`Description: '${apiDescription}'`);
})

module.exports = app;



