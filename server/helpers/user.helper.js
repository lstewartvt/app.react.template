const _ = require('lodash'),
  config = includes('config'), // get our config file
  eJwt = require('express-jwt'),
  jwt = require('jsonwebtoken'), // used to create, sign, and verify tokens
  props = includes('properties'), // get server properties
  User = includes('data/models/User.schema'); // get our mongoose model

// Mongoose User helper methods
var userHelper = module.exports = {
  get_token: (user) => {

    return token = jwt.sign(_.pick(user, [
      '_id'
    ]), process.env.auth_secret, {
      expiresIn: 60 * config.server.auth.expires
    });
  },
  list: function(request, response) {
    return User.find({});
  }
};
