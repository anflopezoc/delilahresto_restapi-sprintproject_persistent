const config = require('../config/config')
const mariadb = require('mariadb')
const { Sequelize, DataTypes, QueryTypes} = require('sequelize');
const Config = config.module;

const db = {};

(async function (){
  try {
    const connection = await mariadb.createConnection({
      host:Config.DB_host,
      port:Config.DB_port,
      user:Config.DB_user,
      password:Config.DB_password
       })
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${Config.DB_database}\`;`);

    const sequelize = new Sequelize(
      Config.DB_database, 
      Config.DB_user, 
      Config.DB_password, 
            {host: Config.DB_host , 
              dialect: 'mariadb',
            logging:false});
  
      db.Sequelize = Sequelize;
      db.sequelize = sequelize;
      
      //DB Tables
      db.Users = require('../models/user.model')(sequelize, DataTypes);
      db.Products = require('../models/product.model')(sequelize, DataTypes);
      db.Addresses = require('../models/address.model')(sequelize, DataTypes);
      db.Stateorders = require('../models/statesOrder.model')(sequelize, DataTypes);
      db.Orders = require('../models/orders.models')(sequelize, DataTypes);
      db.OrderProducts = require('../models/orderProducts.model')(sequelize, DataTypes);
      db.Payments = require('../models/paymethods.models')(sequelize, DataTypes);
      
      //Join Tables
      
      db.Users.hasMany(db.Addresses);
      db.Addresses.belongsTo(db.Users);
      
      db.Users.hasMany(db.Orders);
      db.Orders.belongsTo(db.Users);
      
      db.Orders.hasMany(db.OrderProducts);
      db.OrderProducts.belongsTo(db.Orders);

      db.Addresses.hasMany(db.Orders);
      db.Orders.belongsTo(db.Addresses);
      
      db.Payments.hasMany(db.Orders);
      db.Orders.belongsTo(db.Payments);
      
      db.Stateorders.hasMany(db.Orders);
      db.Orders.belongsTo(db.Stateorders);

      db.Products.hasMany(db.OrderProducts);
      db.OrderProducts.belongsTo(db.Products);
      

      // Default 
      await sequelize.authenticate();
      await sequelize.sync({ force: false });
      require('../default/user.default')();
      require('../default/products.default')();
      require('../default/stateOrders.default')();
      require('../default/payments.default')();
      console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})()

module.exports = db