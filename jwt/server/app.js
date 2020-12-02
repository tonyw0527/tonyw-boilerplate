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
app.use(passport.initialize());
passportConfig();
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


// Routing
app.use('/api', require('./routes/api'));


app.listen((PORT), () => {
    console.log(`Server is running on ${PORT} now!`);
});