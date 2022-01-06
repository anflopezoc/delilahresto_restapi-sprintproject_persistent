const bcrypt = require('bcrypt');
const config = require('../config/config')
const db = require('../DB/db');

const adminDefault = async () => {
   const userAdmin = await db.Users.findOrCreate({
        where: 
            {
            email: config.module.ADMINUSER,
            isAdmin: true
            },
        defaults: 
            {
            name: 'Admin Delilah Resto',
            email: config.module.ADMINUSER,
            password: bcrypt.hashSync(config.module.ADMINPASSWORD, 10),
            phone: '3144488865',
            isAdmin: true
            }
        });

        await db.Orders.findOrCreate({
            where:{
                email:userAdmin[0].email,
                statusorderId:1
            },
            defaults:{
                email:userAdmin[0].email,
                userId:userAdmin[0].id,
                statusorderId:1
            }
        });
    }

module.exports = adminDefault;
