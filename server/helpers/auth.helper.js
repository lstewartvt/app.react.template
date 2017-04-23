const _ = require('lodash'),
	app_data = includes('../src/components/app.data'),
	app_helper = require('./app.helper'),
	config = includes('data/config'), // get our config file
	passport = require('passport'),
	props = includes('properties'), // application constant values
	user_helper = require('./user.helper'),
	User = includes('data/models/User.schema'); // get our mongoose model

// Set up authentication
let auth_helper = module.exports = {
	check: passport.authenticate('jwt', {
		failureRedirect: app_data.nav.account.login,
		session: false
	}),
	local_login: passport.authenticate('local', {
		session: false
	}),
	login: (username, password, done) => {

		// find the user
		return User.getUserByHandle(username).then(function(existingUser) {

			if (!existingUser) {
				return done(null, false, {
					success: false,
					errors: [props.messages.auth.failed]
				});
			}

			// check if password matches
			return existingUser.isPasswordValid(password.trim())
				.then(function(isValid) {

					if (isValid) {

						return done(null, existingUser = _.omit(existingUser.toObject(), ['password']));
					} else {

						return done(null, false, {
							success: false,
							errors: [props.messages.auth.failed]
						});
					}
				});
		}).catch(function(error) {
			response.status(500).json({
				success: false,
				errors: [error]
			});
		});
	},
	register: (request, response) => {

		const email = request.body.email.trim();
		const handle = (request.body.username || email).trim();

		// create user
		var user = new User({
			email: email,
			first_name: request.body.first_name && request.body.first_name.trim(),
			handle: handle,
			last_name: request.body.last_name && request.body.last_name.trim(),
			password: request.body.password.trim()
		});

		// save user
		user.save()
			.then(new_user => {

				// return the user information as JSON
				response.json({
					success: true,
					message: `Welcome, ${new_user.handle}!`,
					token: user_helper.get_token(new_user = _.omit(new_user.toObject(), ['password'])),
					user: new_user
				});
			})
			.catch(error => {

				response.status(500).json({
					success: false,
					debug: process.env.NODE_ENV === 'development' && error,
					errors: [app_helper.get_error_message(props.messages.mongoose[error.code])]
				});

				throw new Error(error);
			});
	},
	roleCheck: role => {

		return function(request, response, next) {

			const user = request.user;
			User.getUserById(user._id).then(existingUser => {

				// If user is found, check role.
				if (existingUser.role === role) {
					return next();
				}

				response.status(401).json({
					success: false,
					errors: ['You are not authorized to view this content.']
				});
				return next('401:Unauthorized');
			}).catch(error => {

				response.status(422).json({
					success: false,
					errors: ['No user was found.']
				});
				return next(error);
			});
		}
	}
};