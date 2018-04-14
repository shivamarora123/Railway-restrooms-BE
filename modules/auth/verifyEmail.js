const mongoose = require('mongoose')
const checkDetails = require(__base + 'models/users.js')

const verify = (req,res) => {
    let username = req.params.username
    let code = req.params.code
    checkDetails.findOne({"userName":username}, (err,user) => {
      if (!user) {
        res.json({ success: false, message: 'Verification failed. User not found.' })
      }
      else {
        if(user.emailCode == req.params.code) {
          checkDetails.findOneAndUpdate({"userName": username}, {$set:{email_verified:true},$unset: {"emailCode": 1 }}, {new: true}, (err, doc) => {
            if(err){
              console.log("Something wrong when updating data!");
            }
            res.json({ success: true, message: 'Email verified.', user: username})
          })
        }
        else {
          res.json({ success: false, message: 'Verification failed. Wrong verification code.' })
        }
      }
    })
}

module.exports = verify
