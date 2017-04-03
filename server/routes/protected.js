const express = require('express');
const helpers = includes('helpers/');

let routes = module.exports = express.Router();

routes.get('/contacts', (request, response) => {

	var message = {
		config: {
			subject: 'Test React Contact Template',
			to: 'lstewartvt@gmail.com'
		},
		handleError: undefined,
		handleSuccess: undefined,
		response: response,
		template: 'contact'
	};

	helpers.mail.send.call(app, message);
});