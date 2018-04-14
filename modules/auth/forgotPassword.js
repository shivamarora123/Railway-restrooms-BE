const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const authModel = require(__base + 'models/auth.js')
const config = require(__base + 'system/config.js')
const sendSMS = require(__base + 'modules/comm/nexmo.js')
const sendEmail = require(__base + 'modules/comm/email.js')

const app = require(__base + 'app.js')

const forgotPass = (req,res) => {
  authModel.findOne({$or: [{"userName":req.body.username}, {"email":req.body.username}, {"phone":req.body.username}]}, (err,user) => {
    if(err) {
      console.log(err)
    }
    if(!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' })
    }
    if(user){
      console.log(user)
      let subject = "Forgot Password for ENV!$!ON."
      let message = "Please use the following OTP to change your password. \n "+user.changePwdCode
      sendEmail(user.email, subject, message)
      sendSMS("+91"+user.phone, "OTP -"+user.changePwdCode)
    }
  })
}

module.exports = forgotPass
