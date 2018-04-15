var mongoose = require('mongoose');
var schema = mongoose.Schema

var auth = new schema({
    "fullName":String,
    "userName":String,
    "email":String,
    "phone":String,
    "password":String,
    "email_verified":Boolean,
    "phone_verified":Boolean,
    "token":String,
    "OTP_Mobile":Number,
    "emailCode":String,
    "changePwdCode":Number,
    "userType":String
})

module.exports = mongoose.model('users',auth)
