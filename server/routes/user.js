const express = require('express');
const helpers = includes('helpers/');

let routes = module.exports = express.Router();

// route to debug user information (GET /user/debug)
routes.get('/debug', function(request, response) {

	helpers.user.verify.apply(this, arguments).then(() => {

		helpers.user.list.apply(this, arguments).then((users) => {
			this.users = users;

			response.json({
				errors: this.errors,
				user: request.user,
				users: this.users
			});
		});
	});
});