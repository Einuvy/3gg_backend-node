const Property = require('../models/property')

propertyController = {
    getProperties: async (req, res) => {
        try {
            const properties = await Property.find()
            res.json({
                success: true,
                response: {
                    properties
                }
            })
        } catch (error) {
            res.status(400).json({ success: false, error: "Oops! something went wrong, properties cannot be found" })
        }
    },
    createProperty: async (req, res) => {

        let { title,
            description,
            price,
            location,
            bedrooms,
            bathrooms,
            area,
            propertyType,
            propertyStatus,
            images,
            createdAt } = req.body

        try {
            const property = new Property({
                title,
                description,
                price,
                location,
                bedrooms,
                bathrooms,
                area,
                propertyType,
                propertyStatus,
                images,
                createdAt
            })

            await property.save();

            res.json({
                success: true,
                response: {
                    menssage: "Property Created!",
                    property
                }
            })
        } catch (error) {
            res.status(400).json({ success: false, error: "Oops! something went wrong" })
        }
    },
    getPropertyById: async (req, res) => {
        const id = req.params.id;
        try {
            const property = await Property.findOne({ _id: id });


            return res.json({ success: true, response: property })
        } catch (error) {
            return res.status(400).json({ success: false, error: "Property not found" })
        }
    },

}

module.exports = propertyController;