const express = require('express');
const helpers = includes('helpers/');

let routes = module.exports = express.Router();

routes.get('/auth', helpers.auth.check, (request, response) => {
	return response.json({
		success: true
	});
});

// logout
routes.get('/logout', function(request, response) {
	request.logout();
	response.json({
		success: true
	});
});