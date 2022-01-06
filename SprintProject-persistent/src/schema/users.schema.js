const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string()
            .min(3)
            .max(30)
            .required(),
    email: Joi.string()
            .email({minDomainSegments:2,
                tlds: {allow: ['com','net','co']}
            })
            .required(),
    password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeatPassword: Joi.ref('password'),
    phone: Joi.number()
            .greater(9999999)
            .required(),
    isAdmin: Joi.boolean(),
    isActive: Joi.boolean()
});

module.exports = userSchema;
