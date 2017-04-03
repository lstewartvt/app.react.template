const express = require('express');
const helpers = includes('helpers/');
const path = require('path');

let routes = module.exports = express.Router();

// route to authenticate a user (POST /user/login)
routes.post('/login', function(request, response) {
	return helpers.auth.login.apply(this, arguments);
});

// route to register new user (PUT /user/register)
routes.post('/register', function(request, response) {
	return helpers.auth.register.apply(this, arguments);
});

// index template
routes.get('/login', function(request, response) {
	// console.log(request);
	return response.render('index', {
		description: 'React app template login form'
	});
});

routes.get('/register', function(request, response) {
	return response.render('index', {
		description: 'React app template registration form'
	});
});