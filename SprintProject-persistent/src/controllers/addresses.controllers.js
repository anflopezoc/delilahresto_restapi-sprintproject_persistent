const db = require('../DB/db');
const {userFind} = require('./validators/user.validator');
const {addressFind} = require('./validators/address.validator');


exports.allAddresses = async (req, res) => {
    try {
        const user = await userFind(req.user.email);
        const adresses = await db.Addresses.findAll({
                                                attributes: [
                                                    'id',
                                                    'address', 
                                                    'city'
                                                ],
                                                include: [
                                                    {
                                                        model:db.Users,
                                                        attributes: ['email', 'name']
                                                    }],
                                                where:{
                                                    userId:user.id, 
                                                    isActive: true
                                                }
                                            });
        if (!adresses[0]) res.status(400).json(`The user ${req.user.email} has not addresses in his address book.`)
        else res.status(200).json(adresses)        
    } catch (error) {
        res.status(404).json(error)
    }
};


exports.newAddresses = async (req, res) => {
    try {
        const {address, city} = req.body;
        const user = await userFind(req.user.email);
        const addressExist = await addressFind(address,user)
        if (addressExist) res.status(400).json('The address already exists')
        else {
            const newaddress = await db.Addresses.create({
                                                        address, 
                                                        city,
                                                        userId:user.id
                                                        });
            res.status(200).json(newaddress)
        }
        
    } catch (error) {
        res.status(404).json(error)
    }
};

exports.adressUpdate = async (req, res) =>{
    try {
        const id = parseInt(req.params.id);
        const {address} = req.body;
        const user = await userFind(req.user.email);
        const Address = await addressFind(id,user)
        const addressValidator = await db.Addresses.findOne({
                                                        where:{address, userId: user.id}});
        if (Address) {
            if (!addressValidator) {
                await db.Addresses.update({address}, {where:{id, userId: user.id}});
                res.status(200).json(`The user address ID ${id} has been updated`)
            } else res.status(400).json('The adress already exists');           
        } else res.status(400).json('The adress ID does not correspond to the logged user');
    } catch (error) {
        res.status(404).json(error)
    }
}

exports.adressDelete = async (req, res) =>{
    try {
        const id = parseInt(req.params.id);
        const user = await userFind(req.user.email);
        const addressValidator = await db.Addresses.findOne({
                                                            where:{
                                                                isActive:true,
                                                                userId: user.id,
                                                                id:id
                                                                }
                                                            });
        if (addressValidator) {
                await db.Addresses.update({
                                            isActive: false
                                            }, 
                                            {
                                            where:{
                                                id, 
                                                userId: user.id
                                            }
                                        });
                res.status(200).json(`The address has been inactivated`);
        } else res.status(400).json('The adress ID does not correspond to the logged user or does not exists');
    } catch (error) {
        res.status(404).json(error)
    }
}
