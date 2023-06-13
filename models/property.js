const mongoose = require('mongoose');


const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String
        },
        country: {
            type: String
        },
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    propertyType: {
        type: String,
        enum: ['house', 'apartment', 'condo'],
        required: true
    },
    propertyStatus: {
        type: String,
        default: 'disabled',
        enum: ['disabled', 'sold', 'on sale', 'rented', 'reserved'],
        required: true
    },
    images: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'transaction'
    }],
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }],
});

const Property = mongoose.model('property', propertySchema);

module.exports = Property;