const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const authModel = require(__base + 'models/users.js')
const config = require(__base + 'system/config.js')

const app = require(__base + 'app.js')

const checkUser = (req,res) => {
  authModel.findOne({$or: [{"userName":req.body.username}, {"email":req.body.username}, {"phone":req.body.username}]}, (err,user) => {
    if(err) {
      console.log(err)
    }
    if(!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' })
    }
    else {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if(result) {
          if(user.email_verified || user.phone_verified) {
            let filteredUser = {
              "fullName":user.fullName,
              "username":user.userName,
              "email":user.email,
              "type":user.userType
            }
            if(!user.token) {
              var token = jwt.sign(filteredUser, config.settings.salt, {
					     expiresIn: 86400 // expires in 24 hours
				      });
            }

            else {
              var token = user.token;
            }

            authModel.findOneAndUpdate({$or: [{"userName":req.body.username}, {"email":req.body.username}, {"phone":req.body.username}]}, {$set:{token:token}}, {new: true}, (err, doc) => {
              if(err){
                console.log("Something went wrong when updating data!");
              }
            });

				    res.json({
					       "success": true,
					       "message": 'Authenticated',
                 "token": token
				     });
           }
           else {
             res.json({ success: false, message: 'Account not verified.' })
           }
         }
        else {
          res.json({ success: false, message: 'Authentication failed. Wrong Password.' })
        }
      })
    }
  })
}

module.exports = checkUser
