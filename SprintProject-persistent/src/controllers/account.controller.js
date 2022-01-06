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
        const newUser =  await db.Users.create({
                                name,
                                email,
                                password: bcrypt.hashSync(password, 10),
                                phone
                                    });
        await db.Orders.findOrCreate({
                                    where:{
                                        email:newUser.email,
                                        statusorderId:1
                                    },
                                    defaults:{
                                        email:newUser.email,
                                        userId:newUser.id,
                                        statusorderId:1
                                    }
                                });
        const User = await db.Users.findOne({
                                            where:{
                                                email:email
                                            },
                                            attributes: [
                                                'name',
                                                'email',
                                                'phone'
                                            ]
                                        });
        res.status(200).json(User)
    } catch (error) {
        res.status(404).json(error)
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
            res.status(202).json({token})
        } else res.status(401).send('Sorry, incorrect password')
    } else res.status(404).send('User not found')
    
   } catch (error) {
       res.status(404).json(error.details[0].message)
   }
}















