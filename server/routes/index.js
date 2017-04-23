const app_data = includes('../src/components/app.data'),
	helpers = includes('helpers/'),
	path = require('path');

let admin_routes = require('./admin'),
	anonymous_routes = require('./anonymous'),
	protected_routes = require('./protected'),
	user_routes = require('./user');

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

	// set protected routes
	app.use(admin_routes);
	app.use(protected_routes);

	// set user routes
	app.use('/user', user_routes);

	// store database status
	app.use((request, response, next) => {

		response.cookies.set('mongo_live', app.get('mongo_live'), {
			httpOnly: false,
			// secure: true // for your production environment
		});

		next();
	});

	app.get('*', helpers.auth.check, (request, response) => {

		return response.render('index', {
			description: 'React app template'
		});
	});
};