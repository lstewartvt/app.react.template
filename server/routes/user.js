const express = require('express');
const config = includes('data/config');
const helpers = includes('helpers/');
const routes = express.Router();

const User = includes('data/models/UserSchema'); // get our mongoose model

module.exports = (app) => {

  // route to debug user information (GET /user/debug)
  routes.get('/debug', function(request, response) {

    helpers.user.current.apply(this, arguments).then((user) => {
      this.user = user;

      helpers.user.list.apply(this, arguments).then((users) => {
        this.users = users;

        response.json({
          errors: this.errors,
          jwt: this.jwt,
          user: this.user,
          users: this.users
        });
      });
    });
  });

  // apply the routes to our application with the prefix /user
  app.use('/user', routes);
};