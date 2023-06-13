const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

userServices = {
    findAll: async () => {

        try {
            const users = await User.find().populate('transactions').populate('comments');
            if (!users) {
                throw new Error('Users not found');
            }
            return users;
        } catch (error) {
            throw new Error('Failed to get users');
        }
    },
    findAvaliables: async () => {
        try {
            const users = await User.find().populate('transactions').populate('comments').filter(user => user.available);
            if (!users) {
                throw new Error('Users not found')
            }
            return users;
        } catch (error) {
            throw new Error('Failed to get users');
        }
    },
    saveOne: async (userData) => {
        try {
            const { firstName,
                lastName,
                email,
                password,
                img,
                rol } = userData;

            const encryptedPassword = bcryptjs.hashSync(password, 12)

            const user = new User({
                firstName,
                lastName,
                email,
                password: encryptedPassword,
                img,
                rol
            })

            await user.save();

            return user;

        } catch (error) {
            console.error(error);
            throw new Error('Failed to create user');
        }
    },
    findByEmail: async (email) => {
        try {
            const user = await User.findOne({ email }).populate('transactions').populate('comments');
            return user
        } catch (error) {
            console.error(error);
            throw new Error('Failed to get user');
        }
    },
    findById: async (id) => {
        try {
            const user = await User.findOne({ _id: id }).populate('transactions').populate('comments');
            return user;
        } catch (error) {
            throw new Error('Failed to get user');

        }
    },
    deleteOne: async (user) => {
        try {
            const deleted = await User.updateOne(
                { _id: user._id },
                { available: !user.available });

            return deleted;
        } catch (error) {
            console.log(error);
            throw new Error('Failed delete user');
        }
    }
};

module.exports = userServices;