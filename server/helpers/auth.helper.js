const app_helper = require('./app.helper');
const config = includes('data/config'); // get our config file
const http_helper = require('./http.helper');
const props = includes('properties'); // application constant values
const user_helper = require('./user.helper');

const User = includes('data/models/UserSchema'); // get our mongoose model

// Set up authentication
module.exports = {
  init: function() {
    var app = this;
    app.set('auth_secret', config.auth.secret); // secret variable
  },
  check: function(request, response, next) {
    var result = user_helper.current.apply(this, arguments);
    if(result) {
      return result.then(function(user) {
        request.is_authenticated = true;
        request.user = user;
      });
    }
  },
  login: (request, response) => {

    // find the user
    User.findOne({
      handle: request.body.username || 'lstewartvt@gmail.com'
    }).then(function(existingUser) {

      if (!existingUser) {
        response.json({
          error: true,
          message: props.messages.auth.failed
        });
      } else if (existingUser) {

        // check if password matches
        existingUser.passwordIsValid(request.body.password || 'password')
          .then(function(isValid) {

            if (isValid) {
              // create a token with claims
              var token = user_helper.get_token({
                issuer: request.get('host'),
                permissions: undefined,
                subject: existingUser.id
              });

              response.cookies.set(config.auth.cookie_name, token, {
                httpOnly: true,
                // secure: true // for your production environment
              });

              // return the information including token as JSON
              response.json({
                success: true,
                message: `Welcome, ${existingUser.handle}!`,
                token: token
              });
            } else {

              response.json({
                error: true,
                message: props.messages.auth.failed
              });
            }
          });
      }
    }).catch(function(error) {
      throw error;
      response.json({ error: true });
    });
  },
  register: (request, response) => {

    // create me
    var me = new User({
      admin: true, // and you know this...man
      email: 'lstewartvt@gmail.com',
      handle: 'lstewartvt@gmail.com',
      name: 'Lemaire Stewart',
      password: 'password'
    });

    // save me
    me.save()
      .then(function(new_user) {
        console.log(`${new_user.handle}(${new_user.id}) saved successfully`);
        response.json({
          user: new_user,
          success: true
        });
      })
      .catch(function(error) {
        response.json({
          error: true,
          message: app_helper.get_error_message(props.messages.mongoose[error.code])
        });
      });
  }
};
