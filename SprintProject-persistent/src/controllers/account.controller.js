const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken')
const userSchema = require('../schema/users.schema');
const loginSchema = require('../schema/login.schema')
const config = require('../config/config')
const db = require('../DB/db');

exports.signUser= async (req ,res) => {
    try{
        const {
            name,
            email,
            password,
            phone
        } = await userSchema.validateAsync(req.body);
        const newUser = await db.Users.create({
            name,
            email,
            password: bcrypt.hashSync(password, 10),
            phone
        });
        await db.Orders.findOrCreate({
            where:{
                email:newUser.email,
                stateorderId:1
            },
            defaults:{
                email:newUser.email,
                userId:newUser.id,
                stateorderId:1
            }
        });
        res.status(200).json(newUser)
    } catch (error) {
        res.status(404).json(error.details[0].message)
    };
}

exports.login = async(req, res) => {
   try {
    const {email, 
        password
    } = await loginSchema.validateAsync(req.body);
    const user = await db.Users.findOne({where:{email}});
    if (user) {
        const resultado = await bcrypt.compareSync(password, user.password);
        if(resultado){
            const token = jsonwebtoken.sign({
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            },config.module.SIGNATUREJWT)
            res.status(200).json({token})
           
        } else res.status(401).json('Unauthorized')
    } else res.status(400).json('User does not exist')
    
   } catch (error) {
       res.status(404).json(error.details[0].message)
   }
}















