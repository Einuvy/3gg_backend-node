const Comment = require('../models/comment');
const Property = require('../models/property');
const User = require('../models/user');


commentController = {
    getComments: async (req, res) => {
        try {
            const comments = await Comment.find()
            res.json({
                success: true,
                response: {
                    comments
                },
                error: null
            })
        } catch (error) {
            res.status(400).json({ success: false, error: "Oops! something went wrong, comments cannot be found" })
        }
    },
    createComment: async (req, res) => {

        const user = req.user

        let {property, content} = req.body

        try {
            const comment = new Comment({
                property,
                user,
                content
            });

        await comment.save();

        await Promise.all([
            User.updateOne({ _id: user.id }, { $push: { comments: comment._id } }),
            Property.updateOne({ _id: property.id }, { $push: { comments: comment._id } }),
        ]);

        res.json({
            success: true,
            response: {
                menssage: "Comment Created!",
                comment
            }
        })
    } catch(error) {

        res.status(400).json({ success: false, error:"Oops! something went wrong"})
    }
}

}

module.exports = commentController;