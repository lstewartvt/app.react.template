const helpers = includes('helpers/');

module.exports = (app) => {

  // route to authenticate a user (GET /user/login)
  app.get('/login', function(request, response) {
    return helpers.auth.login.apply(this, arguments);
  });

  // route to register new user (PUT /user/register)
  app.get('/register', function(request, response) {
    return helpers.auth.register.apply(this, arguments);
  });
};