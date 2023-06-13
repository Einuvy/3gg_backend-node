const Transaction = require('../models/transaction');
const Property = require('../models/property');
const User = require('../models/user');

transactionController = {
    getTransactions: async (req, res) => {
        try {
            const transaction = await Transaction.find()
            res.json({
                success: true,
                response: {
                    transaction
                }
            })
        } catch (error) {
            res.json({ success: false, error: "Oops! something went wrong, transaction cannot be found" })
        }
    },
    createTransaction: async (req, res) => {

        const user = req.user;

        let { property, amount, type } = req.body

        try {

            const transaction = new Transaction({
                property,
                user,
                amount,
            });


            await transaction.save();

            await Promise.all([
                User.updateOne({ _id: user.id }, { $push: { transactions: transaction._id } }),
                Property.updateOne({ _id: property.id }, { $push: { transactions: transaction._id }, $set: { propertyStatus: type } }),
            ]);

            res.json({
                success: true, response: {
                    menssage: "Transaction Created",
                    transaction
                }
            })
        } catch (error) {

            res.status(400).json({ success: false, error: "Oops! something went wrong" })
        }
    }

}

module.exports = transactionController;