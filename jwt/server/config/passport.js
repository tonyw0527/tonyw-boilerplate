require('dotenv').config();
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
// const ExtractJWT = passportJWT.ExtractJwt;

const cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies[process.env.TOKEN_COOKIE_NAME];
    }
    return token;
};

const User = require('../models/user');


module.exports = () => {
    // Local Strategy
    passport.use(User.createStrategy());

    // JWT Strategy
    passport.use(new JWTStrategy({
        jwtFromRequest: cookieExtractor,
        secretOrKey: process.env.JWT_SECRET
    },
    (jwtPayload, done) => {
        console.log('here')
        console.log(jwtPayload);
        User.findOne({ email: jwtPayload.email }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        })
    }));
}