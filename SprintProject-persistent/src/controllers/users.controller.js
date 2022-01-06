const db = require('../DB/db');
const config = require('../config/config');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const userSchema = require('../schema/users.schema');
const loginSchema = require('../schema/login.schema');

exports.allUsers = async (req, res) => {
    const users = await db.Users.findAll({
        attributes: {exclude: ['password']}
        })
    res.status(200).json(users)
};

exports.createUser = async (req,res) => {
    try {
        const {
            name,
            email,
            password,
            phone,
            isAdmin
        } = await userSchema.validateAsync(req.body);
        const newUser = await db.Users.create({
            name,
            email,
            password: bcrypt.hashSync(password, 10),
            phone,
            isAdmin
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


        res.status(200).json(newUser)        
    } catch (err) {
        res.status(404).json(err)        
    }
};

exports.userInactivate = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const user = await db.Users.findOne({where:{id}});
        if (!user) res.status(404).json('User ID not found')
        else {
            if (user.id == 1) res.status(400).json('Admin User can not be inactivated')
            else {
                if(user.isActive == false ) res.status(400).json('User was already inactivated')
                else {
                     await db.Users.update({
                                            isActive: false
                                            },
                                            {
                                            where:{
                                                    id
                                                 }
                                            });
                    res.status(200).json(`User ID ${req.params.id} has been inactivated`)
                }
            }
            
        }
    } catch (err) {
        res.status(404).json(err)        
    }
};

exports.userUpdate = async (req,res) => {
    try {
        const id = parseInt(req.params.id);
        const user = await db.Users.findOne({
                                            where:{
                                                    id,
                                                    isActive: true
                                                }
                                            });
        if (!user){res.status(400).json('User ID does not exist in database')}
        else {
            const {
                name,
                email,
                password,
                phone,
                isAdmin
            } = await userSchema.validateAsync(req.body);

            await db.Users.update({isAdmin,
                phone,
                email,
                password: bcrypt.hashSync(password, 10),
                name},
                {
                    where:{
                            id
                        }
                    })
            res.status(200).json(`User ${user.email} update`)      
        };
    } catch (err) {
        res.status(404).json(err.details[0].message)
    }
};

exports.userActivate = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const user = await db.Users.findOne({where:{id}});
        if (!user) res.status(404).json('User ID not found')
        else {
            if (user.id == 1) res.status(400).json('Admin User can not be activated')
            else {
                if(user.isActive == true ) res.status(400).json(`User ID ${id} is active`)
                else {
                    await db.Users.update({
                                        isActive: true
                                        },
                                        {
                                        where:{
                                                id
                                            }
                                        });
                    res.status(200).json(`User ID ${id} has been activated`)
                }
            }
            
        }
    } catch (err) {
        res.status(404).json(err)        
    }
};