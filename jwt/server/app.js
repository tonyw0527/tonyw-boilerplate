// Expess
const express = require('express');
const app = express();

// Env
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;
const MONGODB_SECRET = process.env.MONGODB_SECRET;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME;


// DB
const mongoose = require('mongoose');
mongoose.connect(`mongodb://master:${MONGODB_SECRET}@initial-cluster-shard-00-00.r2sqy.mongodb.net:27017,initial-cluster-shard-00-01.r2sqy.mongodb.net:27017,initial-cluster-shard-00-02.r2sqy.mongodb.net:27017/${MONGODB_DB_NAME}?ssl=true&replicaSet=atlas-p3n6uo-shard-0&authSource=admin&retryWrites=true&w=majority`
        , {useNewUrlParser: true,
            useUnifiedTopology: true
        });
const db = mongoose.connection;
db.on('error', console.error.bind(console,
    "connection error:"));
db.once('open', () => {
    console.log('DB connected');
});


// Parsers
const cookieParser = require('cookie-parser');
app.use(express.json()); // application/json 형태의 데이터 파싱
app.use(express.urlencoded({extended: false})); // application/x-www-form-urlencoded 형태의 데이터 parsing
app.use(cookieParser()); // 쿠키 파싱

// Passport
const passport = require('passport');
const passportConfig = require('./config/passport');
const User = require('./models/user');
app.use(passport.initialize());
passportConfig();
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


// Routing
// login - jwt 발급
const AuthTokenController = require('./controllers/AuthTokenController');
app.post('/auth/login', AuthTokenController.create);

// api JWT 인증
const UserController = require('./controllers/UserController');
app.get('/auth/token', UserController.index);

// register
app.post('/auth/signup', (req, res) => {
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
        }
    )
})

// logout
app.get('/auth/logout', (req, res) => {
    req.logout();
    res.json('logout');
    console.log('logout')
})

// isLogin
app.get('/auth/logintest', (req, res) => {
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        res.json('allow');
        console.log('로그인 중')
    } else {
        res.json('notallow');
        console.log('로그인중이 아님!!!!!')
    }
})

app.listen((PORT), () => {
    console.log(`Server is running on ${PORT} now!`);
});