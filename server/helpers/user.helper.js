const config = includes('data/config'); // get our config file
const nJwt = require('njwt'); // used to create, sign, and verify tokens

const User = includes('data/models/UserSchema'); // get our mongoose model

// Mongoose User helper methods
var userHelper = module.exports = {
  current: function(request, response) {
    this.jwt = userHelper.verify.apply(this, arguments);
    if(this.jwt) {
      return User.findById(this.jwt.body.subject);
    }
  },
  get_token: (claims) => {

    var jwt = nJwt.create(claims, config.auth.secret);
    jwt.setExpiration(new Date().getTime() + (config.auth.expire * 60 * 1000));

    var token = jwt.compact();
    return token;
  },
  list: function(request, response) {
    return User.find({});
  },
  verify: function(request, response) {

    // attempt to get token from cookies
    var token = request.cookies.get(config.auth.cookie_name);

    // decode token
    if (token) {

      this.errors = this.errors || [];

      try {
        return nJwt.verify(token, config.auth.secret);
      } catch (error) {

        this.errors.push(error);
        response.cookies.set(config.auth.cookie_name);
      }
    }
  }
};