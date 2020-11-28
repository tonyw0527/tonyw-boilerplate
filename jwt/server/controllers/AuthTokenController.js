const jwt = require('jsonwebtoken');
const passport = require('passport');
require('dotenv').config();

const APP_NAME = 'boilerplate';
const anYear = new Date(Date.now() + (1000 * 60 * 60 * 24 * 365));
const cookieOptions = {expires: anYear};

exports.create = (req, res) => {
    passport.authenticate('local', {session: false}
    ,(err, user) => {
        if(err || !user) {
            console.log('here');
            console.log(err);
            console.log(user);
            return res.status(400).json({
                message: 'Seomthing is not right',
                user: user
            });
        }

        // jwt.sing('token내용', 'JWT secretKey')
        const email = user.email;
        const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '1h'});
        res.cookie(APP_NAME, token); // default session cookie
        //res.cookie(APP_NAME, token, cookieOptions);
        return res.json({
            message: 'login success'
        })
    })(req, res);
};