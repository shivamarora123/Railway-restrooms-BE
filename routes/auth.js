const express = require('express')
const router = express.Router()
const config = require(__base + 'system/config.js')

/* Page Routes */
router.post('/signup', require(__base + 'modules/auth/signup.js'))

router.post('/login', require(__base + 'modules/auth/login.js'))

/* verify routes */
router.get('/verify/email/:username/:code', require(__base + 'modules/auth/verifyEmail.js'))

router.post('/forgotpassword', require(__base + 'modules/auth/forgotPassword.js'))
/* ----------------------- Restricted Routes ----------------------*/

/*--|Authority Protect|--*/
const auth = require(__base + 'modules/auth/protect.js');

/*--|Authority payloadProtected Routes|--*/

router.get('/status', auth, (req, res) => {
    res.json({ "message": 'You are logged in.', "data":req.decoded });
})

router.post('/change-password', auth, require(__base + 'modules/auth/passChange.js'))

router.get('/logout', auth, require(__base + 'modules/auth/logout.js'))
module.exports=router
