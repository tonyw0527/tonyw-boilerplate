const jwt = require('jsonwebtoken');
const passport = require('passport');
require('dotenv').config();

const APP_NAME = 'boilerplate';
const anYear = new Date(Date.now() + (1000 * 60 * 60 * 24 * 365));
// const cookieOptions = {expires: anYear, httpOnly: true };
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

        // jwt.sing('token내용', 'JWT secretKey')
        const email = user.email;
        const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '1h'});
        //res.cookie(APP_NAME, token, cookieOptions);
        res.cookie(APP_NAME, token, { httpOnly: true }); // default session cookie
        
        return res.json({
            message: 'login success'
        })
    })(req, res);
};

exports.logout = (req, res) => {
    req.logout(); // 소용이 있는지 아직 모르겠음
    // token 삭제
    res.cookie('boilerplate', '');
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