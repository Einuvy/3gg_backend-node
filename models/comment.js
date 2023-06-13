const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'property',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    available:{
        type: Boolean,
        default: true 
    }
});

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;