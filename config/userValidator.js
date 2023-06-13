const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity')

const passwordComplexityOptions = {
    min: 8,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 0,
    requirementCount: 4
};

const userValidator = (req, res, next) => {

    const schema = Joi.object({
        firstName: Joi.string().trim().pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑüÜ\s]+$/).required()
            .messages({
                'string.pattern.base': 'The name can contain only letters'
            }),
        lastName: Joi.string().trim().pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑüÜ\s]+$/).required()
            .messages({
                'string.pattern.base': 'The lastname can contain only letters'
            }),
        email: Joi.string().email().required(),
        password: passwordComplexity(passwordComplexityOptions).required(),
        img: Joi.string(),
        role: Joi.string().default('user'),
        createdAt: Joi.date().default(Date.now),
        available: Joi.boolean().default(true)
    })
    const validation = schema.validate(req.body, { abortEarly: false })


    if (validation.error) {
        return res.status(400).json({ success: false, response: validation.error.details, error: true })
    }

    next();

};



module.exports = userValidator;
