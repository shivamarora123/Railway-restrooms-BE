const bcrypt = require('bcrypt');
const mongoose = require('mongoose')

const authModel = require(__base + 'models/users.js')
const config = require(__base + 'system/config.js')

const sendEmail = require(__base + 'modules/comm/email.js')

const rand = require(__base + 'modules/misc/rand.js')

const otp = rand.numeric()
const emCode = rand.static()

const newUser = (req,res) => {
    /* Check if passwords match */
    if(req.body.passEnter == req.body.passConfirm) {
        authModel.findOne({$or:[{"userName":req.body.userName}, {"email":req.body.email}, {"phone":req.body.phone} ] }, (err,user) => {
            if(!user) {
                bcrypt.hash(req.body.passEnter, config.settings.salt, (err, hash) => {
                    if(err) {console.log(err)}
                    else {
                        /* Store user in database */
                        let User = new authModel({
                            "fullName":req.body.fullName,
                            "userName":req.body.userName,
                            "email":req.body.email,
                            "phone":req.body.phone,
                            "password":hash,
                            "email_verified":false,
                            "phone_verified":false,
                            "OTP_Mobile":otp,
                            "emailCode":emCode,
                            "userType":"traveller"
                        })
                        User.save((err,data) => {
                            if (err) {
                                console.log(err)
                            } else {
                                res.json({ success: true, message: 'Registration Successful.' })
                                /* Verification */
                                if(config.settings.verification.sms) {
                                    let num = req.body.phone
                                    let chk = num.split("")
                                    var compNum = num;
                                    if(chk[0] != "+") {
                                        var compNum = "+91"+num
                                    }
                                    let message = 'Your OTP is : '+otp
                                    sendSMS(compNum, message)
                                }
                                if(config.settings.verification.email) {
                                    let subject = "Account activation for Railway Restrooms."
                                    let link = config.settings.protocol+"://"+config.settings.host+"/auth/verify/email/"+req.body.userName+'/'+emCode
                                    let message = "Thank you for registering at Railway restrooms. \n Please click on the following link to activate your account. \n "+link
                                    sendEmail(req.body.email, subject, message)
                                }
                            }
                        });
                    }
                });
            }
            else {
                res.json({ success: false, message: 'Registration failed. Account already exists.' })
            }
        })
    }
    else {
        /* Passwords do not match */
        res.json({ success: false, message: 'Registration failed. Passwords do not match.' })
    }
}

module.exports = newUser
