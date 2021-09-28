const db = require('../DB/db');

exports.allAddresses = async (req, res) => {
    try {
        const user = await db.Users.findOne({where:{email: req.user.email}});
        const adresses = await db.Addresses.findAll({where:{userId:user.id, isActive: true}});
        if (!adresses[0]) res.status(400).json('There are no addresses in your address book.')
        else res.status(200).json(adresses)        
    } catch (error) {
        res.status(404).json(error)
    }
};


exports.newAddresses = async (req, res) => {
    try {
        const {address} = req.body
        const user = await db.Users.findOne({where:{email: req.user.email}});
        const addressExist = await db.Addresses.findOne({where:{address, userId: user.id}});
        if (addressExist) res.status(400).json('The address already exists')
        else {
            const newaddress = await db.Addresses.create({address,userId:user.id})
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
        const user = await db.Users.findOne({where:{email: req.user.email}});
        const Address = await db.Addresses.findOne({where:{id, userId: user.id}});
        const addressValidator = await db.Addresses.findOne({where:{address, userId: user.id}});
        if (Address) {
            if (!addressValidator) {
                await db.Addresses.update({address}, {where:{id, userId: user.id}});
                res.status(200).json(Address)
            } else res.status(400).json('The adress already exists');           
        } else res.status(400).json('The adress ID does not correspond to the logged user');
    } catch (error) {
        res.status(404).json(error)
    }
}

exports.adressDelete = async (req, res) =>{
    try {
        const id = parseInt(req.params.id);
        const user = await db.Users.findOne({where:{email: req.user.email}});
        const Address = await db.Addresses.findOne({where:{id, userId: user.id}});
        const addressValidator = await db.Addresses.findOne({where:{isActive:false, userId: user.id}});
        if (Address) {
            if (!addressValidator) {
                await db.Addresses.update({isActive: false}, {where:{id, userId: user.id}});
                res.status(200).json(`The address was deleted`)
            } else res.status(400).json('The adress does not exists');           
        } else res.status(400).json('The adress ID does not correspond to the logged user');
    } catch (error) {
        res.status(404).json(error)
    }
}
