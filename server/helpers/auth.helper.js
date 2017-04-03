const _ = require('lodash');
const app_helper = require('./app.helper');
const config = includes('data/config'); // get our config file
const http_helper = require('./http.helper');
const props = includes('properties'); // application constant values
const user_helper = require('./user.helper');

const User = includes('data/models/UserSchema'); // get our mongoose model

// Set up authentication
let auth_helper = module.exports = {
	init: function() {
		var app = this;
		app.set('auth_secret', process.env.auth_secret); // secret variable
	},
	login: (request, response) => {

		// find the user
		User.findOne({
			$or: [{
				email: request.body.username.trim()
			}, {
				handle: request.body.username.trim()
			}]
		}).then(function(existingUser) {

			if (!existingUser) {
				response.status(400).json({
					error: true,
					message: props.messages.auth.failed
				});
			} else if (existingUser) {

				// check if password matches
				existingUser.isPasswordValid(request.body.password.trim())
					.then(function(isValid) {

						if (isValid) {

							// create a token with claims
							var token = user_helper.get_token(existingUser = _.omit(existingUser.toObject(), ['password']));
							response.cookies.set(process.env.cookie_name, token, {
							httpOnly: false,
							// secure: true // for your production environment
							});

							// return the information including token as JSON
							response.json({
								success: true,
								message: `Welcome, ${existingUser.handle}!`,
								token: token,
								user: existingUser
							});
						} else {

							response.status(400).json({
								error: true,
								message: props.messages.auth.failed
							});
						}
					});
			}
		}).catch(function(error) {
			response.status(500).json({
				error: true,
				message: error
			});
		});
	},
	register: (request, response) => {

		var email = request.body.email.trim();

		// create user
		var user = new User({
			admin: request.body.admin,
			email: email,
			handle: request.body.handle.trim() || email,
			name: request.body.name.trim(),
			password: request.body.password.trim()
		});

		// save user
		user.save()
			.then(function(new_user) {
				auth_helper.login(request, response);
			})
			.catch(function(error) {
				response.status(500).json({
					error: true,
					message: app_helper.get_error_message(props.messages.mongoose[error.code])
				});
			});
	}
};