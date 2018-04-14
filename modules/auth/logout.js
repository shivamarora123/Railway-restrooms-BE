const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const authModel = require(__base + 'models/auth.js')
const oauthModel = require(__base + 'models/oauth.js')

const config = require(__base + 'system/config.js')

const app = require(__base + 'app.js')

const logoutUser = (req,res) => {
  let username = req.decoded.username;
  console.log(username)
  let type = req.decoded.oauth || false
  if(type) {
    req.logout()
    oauthModel.findOneAndUpdate({"userName": username}, {$unset: {"token": 1 }}, {new: true}, (err, doc) => {
      if(err){
        console.log("Something wrong when updating data!");
      }
      res.json({ success: true, message: 'Logged out.'})
    });
  }
  else {
    authModel.findOneAndUpdate({"userName": username}, {$unset: {"token": 1 }}, {new: true}, (err, doc) => {
      if(err){
        console.log("Something wrong when updating data!");
      }
      res.json({ success: true, message: 'Logged out.'})
    });
  }
}

module.exports = logoutUser
