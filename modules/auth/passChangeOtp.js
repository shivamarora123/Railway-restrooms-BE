const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const authModel = require(__base + 'models/users.js')
const config = require(__base + 'system/config.js')

const change = (req, res) => {
    bcrypt.hash(req.body.newPassword, config.settings.salt, (err, hash) => {
        if (err) {
            console.log(err)
        }
        authModel.findOneAndUpdate({ "changePwdCode": req.body.changePwdCode }, { $set: { password: hash } }, { new: true }, (err, doc) => {
            if (err) {
                console.log(err);
            }
            res.json({ "success": true, "message": "Password changed successfully." })
        })
    })
}

module.exports = change
