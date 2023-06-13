const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwtStrategy = passportJWT.Strategy
const extractJwt = passportJWT.ExtractJwt


const User = require('../models/user')

module.exports = passport.use(new jwtStrategy(
    {
        jwtFromRequest: extractJwt.fromExtractors([
            extractJwt.fromAuthHeaderAsBearerToken(),
            (req) => {
                let token = null;
                if (req.headers?.cookie) {
                    token = req.headers?.cookie.split('=')[1];
                    console.log(token);
                }
                return token;
            }
        ]),
        secretOrKey: process.env.SECRET_KEY

    },
    async (jwt_payload, done) => {
        try {
            const user = await User.findOne({ _id: jwt_payload._id });

            if (!user) {
                return done(null, false);
            }

            return done(null, user);

        } catch (error) {
            return done(error, false);
        }
    }
));
