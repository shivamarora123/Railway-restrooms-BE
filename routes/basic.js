const express = require('express')
const router = express.Router()

const config = require(__base + 'system/config.js')

/* Page Routes */
router.get('/',(req,res) => {
    let output = {
        "message":"Welcome to Railways Restrooms"
    }
    res.json(output)
})

module.exports = router
