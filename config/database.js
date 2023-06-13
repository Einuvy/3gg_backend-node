const  mongoose = require('mongoose');
require('dotenv').config();


const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI)
.then( () => console.log('data base connected'))
.catch( err => console.error(err) )