const jwt = require('jsonwebtoken');
const passport = require('passport');
require('dotenv').config();

const TOKEN_COOKIE_NAME = process.env.TOKEN_COOKIE_NAME;
const anMonth = new Date(Date.now() + (1000 * 60 * 60 * 24 * 30));
const cookieOptions = {expires: anMonth, httpOnly: true, secure: false }; // set secure to true in production
const User = require('../../../models/user');

exports.login = (req, res) => {
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
        console.log(req.body);
        
        if(req.body.isKeepLogin) {
            const email = user.email;
            const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '30 days'});
            res.cookie(TOKEN_COOKIE_NAME, token, cookieOptions);
        } else {
            const email = user.email;
            const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '1 days'});
            res.cookie(TOKEN_COOKIE_NAME, token, { httpOnly: true, secure: false });
        }
        
        return res.json({
            message: 'login success'
        })
    })(req, res);
};

exports.logout = (req, res) => {
    req.logout(); // 소용이 있는지 아직 모르겠음
    // token 삭제
    res.clearCookie(TOKEN_COOKIE_NAME);
    res.json('logout');
    console.log('logout');
}

exports.register = (req, res) => {
    User.register(
        new User({ email: req.body.email, nickname: req.body.nickname }),
        req.body.password,
        (err, user) => {
            if(err){
                console.log(err);
            } else {
                console.log(user);
                res.json('success');
            }
    })
};