const app_data = includes('../src/components/app.data');
const helpers = includes('helpers/');
const path = require('path');

let anonymous_routes = require('./anonymous');
let protected_routes = require('./protected');
let user_routes = require('./user');

module.exports = (app) => {

	const mongo_live = app.get('mongo_live');

	// set templates
	app.set('views', [
		path.resolve(__dirname, './../../dist'),
		path.resolve(__dirname, './../templates/mail')
	]);
	app.set('view engine', 'pug');

	// Set up smtp
	helpers.mail.init.call(app);

	// set anonymous routes
	app.use(anonymous_routes);

	// route middleware to verify auth
	if (mongo_live) {
		app.use(helpers.user.verify);
	}

	// set protected routes
	app.use(protected_routes);

	// set user routes
	app.use('/user', user_routes);

	app.get('*', (request, response) => {

		response.cookies.set('mongo_live', app.get('mongo_live'), {
			httpOnly: false,
			// secure: true // for your production environment
		});

		if (request.user || !mongo_live) {

			return response.render('index', {
				description: 'React app template'
			});
		}

		return response.redirect(app_data.nav.account.login);
	});
};