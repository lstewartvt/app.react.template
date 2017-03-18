const helpers = includes('helpers/');

module.exports = (app) => {

  // route to authenticate a user (POST /user/login)
  app.post('/auth/login', function(request, response) {
    return helpers.auth.login.apply(this, arguments);
  });

  // route to register new user (PUT /user/register)
  app.put('/auth/register', function(request, response) {
    return helpers.auth.register.apply(this, arguments);
  });
};