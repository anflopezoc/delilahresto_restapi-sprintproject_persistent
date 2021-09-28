const db = require('../DB/db');

exports.allPayment = async (req, res) => {
    const payments = await db.Payments.findAll({where:{isActive:true}});
    res.status(200).json(payments)
};

exports.newPayment = async (req, res) => {
    try {
        const {method} = req.body;
        const Method =  await db.Payments.findOne({where:{method}});
        if (!Method) {
            const newMethod = await db.Payments.create({method});
            res.status(200).json(newMethod)
        } else res.status(400).json('The payment method already exists')
    } catch (error) {
        res.status(404).json(error)        
    }
};

exports.updatePayment = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const {method} = req.body;
        const Method =  await db.Payments.findOne({where:{id,isActive:true}});
        if (Method) {
            if (Method.method == method) res.status(400).json('The payment method update is the same as the existing one')
            else {
                await db.Payments.update({method},{where:{id}});
                res.status(200).json('The payment method updated')
           }
        } else res.status(400).json('The payment method does not exists')
    } catch (error) {
        res.status(404).json(error)        
    }
};

exports.inactivatePayment = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const Method =  await db.Payments.findOne({where:{id,isActive:true}});
        if (Method) {
            await db.Payments.update({isActive:false},{where:{id}});
            res.status(200).json('The payment method has been inactivated')
        } else res.status(400).json('The payment method does not exists')
    } catch (error) {
        res.status(404).json(error)        
    }
}