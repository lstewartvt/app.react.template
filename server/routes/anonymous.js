const helpers = includes('helpers/');
const path = require('path');

module.exports = (app) => {

  // route to authenticate a user (POST /user/login)
  app.post('/auth/login', function(request, response) {
    return helpers.auth.login.apply(this, arguments);
  });

  // route to register new user (PUT /user/register)
  app.post('/auth/register', function(request, response) {
    return helpers.auth.register.apply(this, arguments);
  });

  // index template
  app.set('views', path.resolve(__dirname, './../../dist'));
  app.set('view engine', 'jade');
  app.get('/login', function(request, response) {
      return response.render('index', { description: 'React app template login form' });
  });

  app.get('/register', function(request, response) {
      return response.render('index', { description: 'React app template registration form' });
  });
};