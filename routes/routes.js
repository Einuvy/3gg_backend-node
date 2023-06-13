const router = require('express').Router();
const {getUsers, getAvailableUsers, register, deleteUser, getUserById, login, logout, getCurrentUser} = require('../controllers/userController');
const {getProperties, createProperty, getPropertyById} = require('../controllers/propertyController')
const {getComments, createComment} = require('../controllers/commentController')
const {getTransactions, createTransaction} = require('../controllers/transactionController')
const {getFavorites, createFavorite} = require('../controllers/favoriteController')
const userValidator = require('../config/userValidator')
const propertyValidator = require('../config/propertyValidator')
const passport = require('../config/passport')
const requireRole = require('../config/roleValidator')

//Auth
router.route('/login')
.post(login)

router.route('/logout')
.post(logout)

router.route('/sign-up')
.post(userValidator, register)

//admin
router.route('/admin/users-all')
.get(passport.authenticate('jwt',{session:false}), requireRole("admin"), getUsers)

router.route('/admin/users')
.get(passport.authenticate('jwt',{session:false}), requireRole("admin"), getAvailableUsers)

//users
router.route('/users/current')
.get(passport.authenticate('jwt',{session:false}), getCurrentUser)
.delete(passport.authenticate('jwt',{session:false}),deleteUser)

router.route('/users/:id')
.get(passport.authenticate('jwt',{session:false}), requireRole("admin"), getUserById)


router.route('/properties')
.get(getProperties)
.post(passport.authenticate('jwt',{session:false}), propertyValidator, createProperty)

router.route('/properties/:id')
.get(getPropertyById)

router.route('/comments')
.get(passport.authenticate('jwt',{session:false}), requireRole("admin"),getComments)
.post(passport.authenticate('jwt',{session:false}),createComment)

router.route('/transactions')
.get(passport.authenticate('jwt',{session:false}), requireRole("admin"), getTransactions)
.post(passport.authenticate('jwt',{session:false}), createTransaction)

router.route('/favorites')
.get(passport.authenticate('jwt',{session:false}), requireRole("admin"), getFavorites)
.post(passport.authenticate('jwt',{session:false}), createFavorite)

module.exports = router;