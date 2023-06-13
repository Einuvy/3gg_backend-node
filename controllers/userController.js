const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { findAll, findAvaliables, findByEmail, saveOne, findById } = require('../services/userServices')

userController = {
    getUsers: async (req, res) => {

        try {
            const users = await findAll();

            return res.json({
                success: true,
                response: {
                    users
                }
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ success: false, error: "Oops! something went wrong" })
        }
    },
    getAvailableUsers: async (req, res) => {

        try {
            const users = await findAvaliables();

            return res.json({
                success: true,
                response: {
                    users
                }
            })
        } catch (error) {
            return res.status(500).json({ success: false, error: "Oops! something went wrong" })
        }
    },
    register: async (req, res) => {

        let user = req.body
        try {
            const emailRegistred = await findByEmail(user.email);

            if (emailRegistred) {
                return res.status(400).json({ success: false, error: "This email is already in use." })
            }


            const userCreated = await saveOne(user);

            const authUser = {
                _id: userCreated._id,
                firstName: userCreated.firstName,
                lastName: userCreated.lastName,
                email: userCreated.email
            }

            const token = jwt.sign({ ...authUser }, process.env.SECRET_KEY)
            res.cookie('token', token, {
                httpOnly: true
            });
            res.json({
                success: true,
                response: {
                    message: "Register successfully!"
                }
            })

        } catch (error) {
            console.error(error);
            return res.status(400).json({ success: false, error: "Oops!, something went wrong" })
        }
    },
    deleteUser: async (req, res) => {
        const id = req.user?._id
        try {
            const deleteUser = await findById(id);

            const deleted = await deleteOne(deleteUser);

            if (!deleted && deleteUser) {
                throw new Error();
            }
            return res.json({ success: true, response: "User deleted sucessfully" });
        } catch (error) {
            return res.status(400).json({ success: false, error: "Oops!, something went wrong" });
        }
    },
    getUserById: async (req, res) => {
        const id = req.params.id;

        try {
            const currentUser = await findById(id);
            return res.json({ success: true, response: currentUser })
        } catch (error) {
            return res.status(400).json({ success: false, error: "Account not found" })
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;

        try {

            const user = await findByEmail(email);
            const auth = bcryptjs.compareSync(password, user.password)

            if (user && auth && user.available) {

                const authUser = {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }

                const token = jwt.sign({ ...authUser }, process.env.SECRET_KEY)
                res.cookie('token', token, {
                    httpOnly: true
                });
                return res.json({
                    success: true,
                    response: {
                        message: "Login successfully!"
                    }
                })
            }
            return res.status(400).json({ success: false, error: "Email/password wrong, try again" })
        } catch (error) {
            console.log(error);
            return res.status(400).json({ success: false, error: "Login error" })
        }
    },
    logout: (req, res) => {
        res.cookie('token', '', { expires: new Date(0) })
            .json({ success: true, message: "Logged out successfully" });
    },
    getCurrentUser: async (req, res) => {
        const email = req.user?.email;
        try {

            const user = await findByEmail(email)

            if (user) {
                return res.json({
                    success: true,
                    response: {
                        user
                    }
                })
            }
            throw new Error();
        } catch (error) {
            console.log(error);
            return res.status(400).json({ success: false, error: "Account not found error" })
        }
    }
}

module.exports = userController;