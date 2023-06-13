const jwt = require('jsonwebtoken');

const requireRole = (role) => (req, res, next) => {
    secretKey = process.env.SECRET_KEY

    if (req.user.role === role) {
        next();
    } else {
        res.status(403).json({ message: 'Acceso denegado' });
    }

};

module.exports = requireRole;