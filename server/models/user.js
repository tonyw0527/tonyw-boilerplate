// passport user schema
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    Regi_date: {
        type: Date,
        default: Date.now()
    }}, {
        versionKey: false
    });

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);