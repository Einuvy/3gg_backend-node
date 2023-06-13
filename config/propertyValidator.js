const Joi = require('joi');


const propertyValidator = (req, res, next) => {

    const schema = Joi.object({
        title: Joi.string().trim().regex(/^[a-zA-Z\s]*$/).required().messages({
            'string.empty': 'The title is required',
            'string.pattern.base': 'The title can only contain letters and spaces',
        }),
        description: Joi.string().trim().required().messages({
            'string.empty': 'A description is required',
        }),
        price: Joi.number().min(0).required().messages({
            'number.empty': 'The price is required',
            'number.min': 'The price cannot be negative',
        }),
        location: Joi.object({
            address: Joi.string().trim().required().messages({
                'string.empty': 'The address is required',
            }),
            city: Joi.string().trim().required().messages({
                'string.empty': 'City is required',
            }),
            state: Joi.string().trim(),
            country: Joi.string().trim(),
        }),
        bedrooms: Joi.number().min(0).required().messages({
            'number.empty': 'The number of bedrooms is required',
            'number.min': 'The number of bedrooms cannot be negative',
        }),
        bathrooms: Joi.number().min(0).required().messages({
            'number.empty': 'The number of bathrooms is required',
            'number.min': 'The number of bathrooms cannot be negative',
        }),
        area: Joi.number().min(0).required().messages({
            'number.empty': 'Area is required',
            'number.min': 'Area cannot be negative',
        }),
        propertyType: Joi.string().valid('house', 'apartment', 'condo').required().messages({
            'any.only': 'Property type is not valid',
        }),
        propertyStatus: Joi.string().valid('disabled', 'sold', 'on sale', 'rented', 'reserved').default('disabled').required().messages({
            'any.only': 'Property status is not valid',
        }),
        images: Joi.array().items(Joi.string()),
    });

    console.log(req.body);

    const validation = schema.validate(req.body, { abortEarly: false })


    if (validation.error) {
        return res.status(400).json({ success: false, response: validation.error.details, error: true })
    }

    next();

};

module.exports = propertyValidator;