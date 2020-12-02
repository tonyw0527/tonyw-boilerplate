const jwt = require('jsonwebtoken');
const passport = require('passport');
require('dotenv').config();

const APP_NAME = 'boilerplate';
const anYear = new Date(Date.now() + (1000 * 60 * 60 * 24 * 365));
const cookieOptions = {expires: anYear};

const authMiddleware = (req, res, next) => {
    console.log(req.headers);
    console.log('토큰 검증 라우터');

    passport.authenticate('jwt', {session: false}
    ,(err, user) => {
        if(err || !user) {
            console.log('토큰 인증 실패');
            return res.status(400).json({
                message: 'Seomthing is not right',
                user: user
            });
        }
        console.log('토큰 인증 성공')
        next();

        // token 갱신
        const email = user.email;
        const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '1h'});
        res.cookie(APP_NAME, token, { httpOnly: true }); // default session cookie
        //res.cookie(APP_NAME, token, cookieOptions);
        return res.json({
            message: 'token access allow'
        })
    })(req, res, next);

}

module.exports = authMiddleware