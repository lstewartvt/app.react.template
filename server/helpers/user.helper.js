const app_data = includes('../src/components/app.data');
const config = includes('data/config'); // get our config file
const eJwt = require('express-jwt');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const props = includes('properties'); // get server properties

const User = includes('data/models/User.schema'); // get our mongoose model

// Mongoose User helper methods
var userHelper = module.exports = {
	get_token: (user) => {

		return token = jwt.sign(user, process.env.auth_secret, {
			expiresIn: 60 * config.auth.expire
		});
	},
	list: function(request, response) {
		return User.find({});
	},
	verify: function() {
		eJwt({
			credentialsRequired: false,
			getToken: (request) => {
				if (request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Bearer') {
					return request.headers.authorization.split(' ')[1];
				} else if (request.query && request.query.token) {
					return request.query.token;
				} else if (token = request.cookies.get(process.env.cookie_name)) {
					return token;
				}
				return null;
			},
			secret: process.env.auth_secret
		})
	},
	verify_manual: function(request, response) {

		// attempt to get token from cookies
		var token = request.cookies.get(process.env.cookie_name);

		// decode token
		if (token) {

			this.errors = this.errors || [];

			return jwt.verify(token, process.env.auth_secret, function(error, user) {

				if (error) {
					response.cookies.set(process.env.cookie_name);
					return response.status(401).json({
						success: false,
						error: error,
						message: props.messages.auth.unverified
					});
				}

				request.is_authenticated = request.is_authorized = true;
				request.user = user;
			});
		}
	}
};