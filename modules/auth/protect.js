const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const authModel = require(__base + 'models/users.js')
//const oauthModel = require(__base + 'models/oauth.js')
const config = require(__base + 'system/config.js')

const app = require(__base + 'app.js')

const auth = (req,res,next) => {
  // check header or url parameters or post parameters for token
	let token = req.body.token || req.params.token || req.headers['x-access-token'];
	// decode token
  if (token) {
		// verifies secret and checks exp
		jwt.verify(token, config.details.Secret, (err1, decoded) => {
			/*
			if(decoded.oauth) {
				oauthModel.findOne({"userName":decoded.username}, (err2,user) => {
					if ((err1||err2)||(user.token !== token)||(!token)) {
						return res.json({ type:true, success: false, message: 'Failed to authenticate token.' });
					}
					else {
						// if everything is good, save to request for use in other routes
						req.decoded = decoded;
						next();
					}
				});
			} */

				authModel.findOne({"userName":decoded.username}, (err2,user) => {
					if ((err1||err2)||(user.token !== token)||(!token)) {
						return res.json({ type:false, success: false, message: 'Failed to authenticate token.' });
					}
					else {
						// if everything is good, save to request for use in other routes
						req.decoded = decoded;
						next();
					}
				});

		});

	}
	else {
		// if there is no token
		// return an error
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});
	}
}

module.exports = auth;
