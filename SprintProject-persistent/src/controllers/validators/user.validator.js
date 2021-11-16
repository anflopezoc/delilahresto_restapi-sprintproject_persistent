const db = require('../../DB/db');

exports.userFind = async (email) => {
    return await db.Users.findOne({
        where:{
        email: email
            }
        });
}