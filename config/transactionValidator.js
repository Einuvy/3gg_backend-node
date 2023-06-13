const Joi = require('joi');


const transactionValidator = (req, res, next) => {

    const schema = Joi.object({
        property: Joi.string().required(),
        user: Joi.string().required(),
        amount: Joi.number().min(0).required(),
        date: Joi.date().default(Date.now)
      });

    const validation = schema.validate(req.body, { abortEarly: false })


    if (validation.error) {
        return res.status(400).json({ success: false, response: validation.error.details, error: true })
    }

    next();

};

module.exports = transactionValidator;