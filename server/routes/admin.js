const express = require('express');
const helpers = includes('helpers/');

let routes = module.exports = express.Router();

routes.get('/admin/restart', function() {
	process.exit(1);
});

routes.get('/admin/mongoose', function(request, response, next) {
	const user = {};
	const GenerateSchema = require('generate-schema');
	const schema = GenerateSchema.json('Product', user);

	response.json(schema);
});

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