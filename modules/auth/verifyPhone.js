const mongoose = require('mongoose')
const checkDetails = require(__base + 'models/users.js')

const verify = (req,res) => {
    let username = req.params.username
    let entered_otp = req.body.otp
    checkDetails.findOne({"userName":username}, (err,user) => {
      if (!user) {
        res.json({ success: false, message: 'Verification failed. User not found.' })
      }
      else {
        if(user.OTP_Mobile == req.body.otp) {
          checkDetails.findOneAndUpdate({"userName": username}, {$set:{phone_verified:true},$unset: {"OTP_Mobile": 1 }}, {new: true}, (err, doc) => {
            if(err){
              console.log("Something wrong when updating data!");
            }
            res.json({ success: true, message: 'Mobile verified.', user: username})
          })
        }
        else {
          res.json({ success: false, message: 'Verification failed. Wrong verification code.' })
        }
      }
    })
}

module.exports = verify
