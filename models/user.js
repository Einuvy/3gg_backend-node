const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'transaction'
    }],
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }],
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    available: {
        type: Boolean,
        default: true
    }
})

const User = mongoose.model('user', userSchema);

module.exports = User;