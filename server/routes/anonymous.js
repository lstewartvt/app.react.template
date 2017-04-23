const app_data = includes('../src/components/app.data'),
	express = require('express'),
	helpers = includes('helpers/'),
	path = require('path');

let routes = module.exports = express.Router();

// login form
routes.get('/login', function(request, response) {
	response.cookies.set(app_data.auth.cookie_name, undefined, {
		expires: new Date()
	});
	response.cookies.set(app_data.auth.user_cookie, undefined, {
		expires: new Date()
	});
	return response.render('index', {
		description: 'React app template login form'
	});
});

// registration form
routes.get('/register', function(request, response) {
	return response.render('index', {
		description: 'React app template registration form'
	});
});

routes.post('/login', (request, response, next) => {

	// Validate fields
	request.checkBody('username', 'Username is required.').notEmpty();
	request.checkBody('password', 'Password is required.').notEmpty();

	let errors = request.validationErrors();
	if (errors) {

		return response.status(400).json({
			success: false,
			errors: errors.map((error) => {
				return error.msg;
			}),
			field_errors: errors
		});
	}

	next();
});

// route to authenticate a user (POST /user/login)
routes.post('/login', helpers.auth.local_login, (request, response) => {

	// return the user information as JSON
	response.json({
		success: true,
		message: `Welcome, ${request.user.handle}!`,
		token: helpers.user.get_token(request.user),
		user: request.user
	});
});

routes.post('/register', (request, response, next) => {

	// Validate fields
	request.checkBody('email', 'Invalid email address.').isEmail();
	request.checkBody('username', 'Username is required.').notEmpty();
	request.checkBody('password', 'Password is required.').notEmpty();
	// request.checkBody('password2', 'Passwords should match.').equals(request.body.password);

	let errors = request.validationErrors();
	if (errors) {

		return response.status(400).json({
			success: false,
			errors: errors,
			errors: errors.map((error) => {
				return error.msg;
			}),
			field_errors: errors
		});
	}

	next();
});

// route to register new user (PUT /user/register)
routes.post('/register', function(request, response) {
	return helpers.auth.register.apply(this, arguments);
});