const app_data = includes('../src/components/app.data');
const helpers = includes('helpers/');
const path = require('path');

module.exports = (app) => {

  // set anonymous routes
  require('./anonymous')(app);

  // route middleware to verify auth
  app.use(function(request, response, next) {

    var result = helpers.auth.check.apply(this, arguments);
    if (result) {
      return result.then(function() {
        next();
      });
    }

    next();
  });

  // set default routes
  require('./default')(app);

  // set user routes
  require('./user')(app);

  // index template
  app.set('views', path.resolve(__dirname, './../../dist'));
  app.set('view engine', 'jade');
  app.get('*', (request, response) => {

    if (request.is_authenticated || !app.get('mongo_live')) {
      return response.render('index', { description: 'React app template' });
    }

    return response.redirect(app_data.nav.login);
  });
};
