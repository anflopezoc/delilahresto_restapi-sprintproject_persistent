const bcrypt = require('bcrypt');
const config = require('../config/config')
const db = require('../DB/db');

const adminDefault = async () => {
   const userAdmin = await db.Users.findOrCreate({
        where: 
            {
            email: 'admin@delilah.com',
            isAdmin: true
            },
        defaults: 
            {
            name: 'Admin Delilah Resto',
            email: 'admin@delilah.com',
            password: bcrypt.hashSync(config.module.ADMINPASSWORD, 10),
            phone: '3144488865',
            isAdmin: true
            }
        });

        await db.Orders.findOrCreate({
            where:{
                email:userAdmin[0].email,
                stateorderId:1
            },
            defaults:{
                email:userAdmin[0].email,
                userId:userAdmin[0].id,
                stateorderId:1
            }
        });
    const userDefault = await db.Users.findOrCreate({
        where: 
            {
            email: 'anflopezoc@gmail.com'
            },
        defaults: 
            {
            name: 'Andres Felipe Lopez',
            email: 'anflopezoc@gmail.com',
            password: bcrypt.hashSync('1234', 10),
            phone: '33144455598',
            }
        });

        await db.Orders.findOrCreate({
                where:{
                    email:userDefault[0].email,
                    stateorderId:1
                },
                defaults:{
                    email:userDefault[0].email,
                    userId:userDefault[0].id,
                    stateorderId:1
                }
            });
 }

module.exports = adminDefault;
