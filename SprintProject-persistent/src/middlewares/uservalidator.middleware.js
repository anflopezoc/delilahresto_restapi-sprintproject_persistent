const db = require("../DB/db");

exports.repeatedemail = async (req, res, next) => {
    const { email} = req.body;
    const emailValidator = await db.Users.findOne({where:{email}})
    if (emailValidator) res.status(404).json('Reapeated email')
    else next()
};

exports.userexistencevalidator = async (req, res, next) => {
    const { email} = req.user;
    const emailValidator = await db.Users.findOne({where:{email}})
    if (!emailValidator) res.status(404).json('The email does not exist')
    else next()
};