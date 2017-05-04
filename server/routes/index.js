const config = includes('config'),
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
  // app.use(helpers.auth.check);
  app.use('/admin', admin_routes);
  app.use(protected_routes);
  app.use(user_routes);

  // store database status
  app.use((request, response, next) => {

    response.cookies.set('mongo_live', app.get('mongo_live'), {
      httpOnly: false,
      // secure: true // for your production environment
    });

    next();
  });

  const default_route = (request, response) => {

    return response.render('index', {
      description: 'React app template'
    });
  };
  app.get('*', helpers.auth.check, default_route);
  app.use(default_route);
};
