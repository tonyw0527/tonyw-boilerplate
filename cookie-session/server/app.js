// **** constant init
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;
const mongodb_secret = process.env.MONGODB_SECRET;
const mongodb_db_name = process.env.MONGODB_DB_NAME;
const cookie_secret = process.env.COOKIE_SECRET;

// **** express init
const express = require('express');
const app = express();

// **** cors init
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

// **** db init
const mongoose = require('mongoose');
mongoose.connect(`mongodb://master:${mongodb_secret}@initial-cluster-shard-00-00.r2sqy.mongodb.net:27017,initial-cluster-shard-00-01.r2sqy.mongodb.net:27017,initial-cluster-shard-00-02.r2sqy.mongodb.net:27017/${mongodb_db_name}?ssl=true&replicaSet=atlas-p3n6uo-shard-0&authSource=admin&retryWrites=true&w=majority`
        , {useNewUrlParser: true,
            useUnifiedTopology: true
        });
const db = mongoose.connection;
db.on('error', console.error.bind(console,
    "connection error:"));
db.once('open', () => {
    console.log('DB connected');
});

// **** parsers init
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// application/x-www-form-urlencoded 형태의 데이터를 parsing
app.use(bodyParser.urlencoded({extended: true}));
// application/json 형태의 데이터를 parsing
app.use(bodyParser.json());
app.use(cookieParser(cookie_secret));

// **** session init
const session = require('express-session')
// 서버 재가동시 세션이 초기화 되는데, 이것을 통해 세션 정보를 저장해둠.
const MongoStore = require("connect-mongo")(session);
app.use(
    session({
      secret: cookie_secret,
      resave: true,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  );

// **** passport init
const passport = require('passport');
const User = require('./models/user');
// express-session 뒤에 passport session이 나와야함
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// **** routing init
// login
app.post('/auth/login', passport.authenticate('local'), (req, res) => {
    res.json('success');
    console.log(req.user);
});

// register
app.post('/auth/signup', (req, res) => {
    console.log('sign up req 도착')
    User.register(
        new User({ username: req.body.username, nickname: req.body.nickname }),
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

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} now!`);
});