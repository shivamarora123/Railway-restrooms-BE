const express = require('express')
const router = express.Router()
const config = require(__base + 'system/config.js')

/* Page Routes */
router.post('/signup', require(__base + 'modules/auth/signup.js'))

router.post('/login', require(__base + 'modules/auth/login.js'))

/* verify routes */
router.get('/verify/email/:username/:code', require(__base + 'modules/auth/verifyEmail.js'))


module.exports=router
