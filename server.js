const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
require('dotenv').config();
require('./config/database')
const router = require('./routes/routes');


app.use(express.json())
app.use(passport.initialize())
app.use('/api', router)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

