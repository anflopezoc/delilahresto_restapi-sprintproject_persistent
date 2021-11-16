const db = require('../../DB/db');

exports.addressFind = async (id,user) => {
    return await db.Addresses.findOne({
        where:{
            id, 
            userId: user.id,
            isActive: true
            }
        })
}