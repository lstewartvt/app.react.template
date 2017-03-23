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
	check: function(request, response, next) {
		var result = user_helper.current.apply(this, arguments);
		if (result) {
			return result.then(function(user) {
				request.is_authenticated = request.is_authorized = true;
				request.user = user;
			});
		}
	},
	login: (request, response) => {

		// find the user
		User.findOne({
			$or: [{
				email: request.body.email
			}, {
				handle: request.body.email
			}]
		}).then(function(existingUser) {

			if (!existingUser) {
				response.status(400).json({
					error: true,
					message: props.messages.auth.failed
				});
			} else if (existingUser) {

				// check if password matches
				existingUser.passwordIsValid(request.body.password)
					.then(function(isValid) {

						if (isValid) {
							// create a token with claims
							var token = user_helper.get_token({
								issuer: request.get('host'),
								permissions: undefined,
								subject: existingUser.id
							});

							response.cookies.set(process.env.cookie_name, token, {
								httpOnly: true,
								// secure: true // for your production environment
							});

							// return the information including token as JSON
							response.json({
								success: true,
								message: `Welcome, ${existingUser.handle}!`,
								token: token
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

		// create user
		var user = new User({
			admin: request.body.admin,
			email: request.body.email,
			handle: request.body.handle || request.body.email,
			name: request.body.name,
			password: request.body.password
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