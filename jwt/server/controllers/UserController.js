const jwt = require('jsonwebtoken');
const passport = require('passport');
require('dotenv').config();

const APP_NAME = 'boilerplate';
const anYear = new Date(Date.now() + (1000 * 60 * 60 * 24 * 365));
const cookieOptions = {expires: anYear};

exports.index = (req, res) => {
    console.log(req.headers);
    passport.authenticate('jwt', {session: false}
    ,(err, user) => {
        if(err || !user) {
            return res.status(400).json({
                message: 'Seomthing is not right',
                user: user
            });
        }
        console.log('토큰 인증 성공')

        // token 갱신
        const email = user.email;
        const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '1h'});
        res.cookie(APP_NAME, token); // default session cookie
        //res.cookie(APP_NAME, token, cookieOptions);
        return res.json({
            message: 'token access allow'
        })
    })(req, res);

}