const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const authModel = require(__base + 'models/users.js')
const config = require(__base + 'system/config.js')

const change = (req,res) => {
  authModel.findOne({$or: [{"userName":req.decoded.username}, {"email":req.decoded.username}, {"phone":req.decoded.username}]}, (err,user) => {
    if(err) {
      console.log("Mongoose Error: "+err)
    }
    if(user) {
      if(req.body.newPassword === req.body.oldPassword) {
        res.json({"success":false,"message":"Old password and new password cannot be the same."})
      }
      else {
        bcrypt.compare(req.body.oldPassword, user.password, (err, result) => {
          if(err) {
            console.log
          }
          if(result) {
            bcrypt.hash(req.body.newPassword, config.settings.salt, (err, hash) => {
              if(err) {
                console.log(err)
              }
              authModel.findOneAndUpdate({"userName": req.body.username}, {$set:{password:hash}}, {new: true}, (err, doc) => {
                if(err){
                  console.log(err);
                }
                res.json({"success":true,"message":"Password changed successfully."})
              })
            })
          }
          else {
            res.json({"success":false,"message":"Old password does not match records."})
          }
        })
      }
    }
  })
}

module.exports = change
