const _ = require('lodash'),
  app_data = includes('../src/components/app.data'),
  app_helper = require('./app.helper'),
  config = includes('data/config'), // get our config file
  mail_helper = require('./mail.helper'),
  passport = require('passport'),
  props = includes('properties'), // application constant values
  user_helper = require('./user.helper');

const User = includes('data/models/User.schema'), // get our mongoose models
  Verify = includes('data/models/Verify.schema');

// Set up authentication
let auth_helper = module.exports = {
  check: passport.authenticate('jwt', {
    failureRedirect: app_data.nav.account.login,
    session: false
  }),
  local_login: (request, response) => {
    passport.authenticate('local', function(alerts, user) {

      if (alerts) {
        return response.status(400).json({
          success: false,
          errors: alerts.errors,
          messages: alerts.messages
        });
      }

      // return the user information as JSON
      return response.json({
        success: true,
        message: `Welcome, ${user.handle}!`,
        token: user_helper.get_token(user),
        user: user
      });
    })(request, response);
  },
  login: (username, password, done) => {

    // find the user
    return User.getUserByHandle(username).then(function(existingUser) {

      if (!existingUser) {
        return done({
          errors: [props.messages.auth.failed]
        });
      }

      if (!existingUser.verified) {
        return done({
          messages: [
            props.messages.auth.unverified,
            props.messages.auth.resend.replace('{user}', existingUser._id)
          ]
        });
      }

      // check if password matches
      return existingUser.isPasswordValid(password.trim())
        .then(function(isValid) {

          if (isValid) {

            return done(null, existingUser.toObject());
          } else {

            return done({
              errors: [props.messages.auth.failed]
            });
          }
        });
    }).catch(function(error) {

      return done({
        success: false,
        errors: [error]
      });
    });
  },
  register: (request, response) => {

    const email = request.body.email.trim();
    const handle = (request.body.username || email).trim();

    // create user
    var user = new User({
      email: email,
      first_name: request.body.first_name && request.body.first_name.trim(),
      handle: handle,
      last_name: request.body.last_name && request.body.last_name.trim(),
      password: request.body.password.trim()
    });

    // save user
    return user.save()
      .then(new_user => {

        new_user = new_user.toObject();
        const config = {
          callback: () => {

            // return the user information as JSON
            return response.json({
              success: true,
              message: `Welcome, ${user.handle}!`,
              token: user_helper.get_token(new_user),
              user: new_user
            });
          },
          host: request.get('host'),
          protocol: request.protocol,
          user: new_user
        };
        return auth_helper.verifyCreate(config);
      })
      .catch(error => {

        const message = error.code ? app_helper.get_error_message(props.messages.mongoose[error.code]) : error;
        return response.status(500).json({
          success: false,
          debug: process.env.NODE_ENV === 'development' && error,
          errors: [message]
        });

        throw new Error(error);
      });
  },
  roleCheck: role => {

    return function(request, response, next) {

      const user = request.user;
      User.getUserById(user._id).then(existingUser => {

        // If user is found, check role.
        if (existingUser.role === role) {
          return next();
        }

        response.status(401).json({
          success: false,
          errors: ['You are not authorized to view this content.']
        });
        return next('401:Unauthorized');
      }).catch(error => {

        response.status(422).json({
          success: false,
          errors: ['User account was not found.']
        });
        return next(error);
      });
    }
  },
  verify: (request, response) => {

    const token = request.params.token;

    if (!token) {
      return response.status(403).redirect(app_data.nav.restricted);
    }

    // attempt to verify user
    return Verify.user(token);
  },
  verifyCreate: (config) => {

    let verification = new Verify({
      user_id: config.user._id
    });
    return verification.generateToken().then(function(token) {

      const token_url = Verify.getTokenUrl({
        host: config.host,
        protocol: config.protocol,
        token
      });
      return auth_helper.verifySend(config.user, token_url, () => {

        if (config.callback && typeof config.callback === 'function') {
          return config.callback();
        }
      });
    });
  },
  verifyResend: (request, response) => {

    return User.getUserById(request.params.user_id).then(user => {

      return Verify.getUserToken(user._id).then(function(verify) {

        if (!verify.success) {

          const config = {
            callback: () => {

              // return the user information as JSON
              return response.redirect(app_data.nav.account.loginResend.replace('{success}', true));
            },
            host: request.get('host'),
            protocol: request.protocol,
            user: user
          };
          return auth_helper.verifyCreate(config);
        }

        const token_url = Verify.getTokenUrl({
          host: request.get('host'),
          protocol: request.protocol,
          token: verify.token
        });
        return auth_helper.verifySend(user, token_url, function() {

          // return the user information as JSON
          return response.redirect(app_data.nav.account.loginResend.replace('{success}', true));
        });
      }).catch(error => {

        console.log(error);
        return response.redirect(app_data.nav.account.loginResend.replace('{success}', false));
      });
    })
  },
  verifySend: (user, token_url, callback) => {

    const message = {
      config: {
        name: user.name,
        subject: 'ReactApp Account Verification',
        to: user.email,
        expires: config.verify.expireText,
        url: token_url
      },
      template: 'verify'
    };

    mail_helper.send(message, function() {

      if (callback && typeof callback === 'function') {
        callback();
      }
    });
  }
};
