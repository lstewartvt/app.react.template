const app_data = includes('../src/components/app.data'),
  express = require('express'),
  helpers = includes('helpers/'),
  path = require('path');

let routes = module.exports = express.Router();

// login form
routes.get('/login', function(request, response) {
  response.cookies.set(app_data.auth.cookie_name, undefined, {
    expires: new Date()
  });
  response.cookies.set(app_data.auth.user_cookie, undefined, {
    expires: new Date()
  });
  return response.render('index', {
    description: 'React app template login form'
  });
});

// registration form
routes.get('/register', function(request, response) {
  return response.render('index', {
    description: 'React app template registration form'
  });
});

// 403 page
routes.get('/restricted', function(request, response) {
  return response.render('index', {
    description: '403: Unauthorized'
  });
});

// resend verification token
routes.get('/verify/resend/:user_id', function(request, response) {
  return helpers.auth.verifyResend.apply(this, arguments);
});

// user verification
routes.get('/verify/:token', function(request, response) {
  return response.render('index', {
    description: 'Verification Success'
  });
});

// user verification
routes.post('/verify/:token', function(request, response) {

  try {
    return helpers.auth.verify.apply(this, arguments)
      .then(function(auth) {

        if (!auth.success) {
          throw new Error('Verification Failed');
        }

        return response.json({
          success: true,
          token: auth.token,
          user: auth.user
        });
      })
      .catch(error => {
        console.log('Verification failed:', error);
        return response.status(403).json({
          success: false
        });
      });
  } catch (error) {
    console.error('Verification failed:', error);
    return response.status(403).json({
      success: false
    });
  }
});

routes.post('/login', (request, response, next) => {

  // Validate fields
  request.checkBody('username', 'Username is required.').notEmpty();
  request.checkBody('password', 'Password is required.').notEmpty();

  let errors = request.validationErrors();
  if (errors) {

    return response.status(400).json({
      success: false,
      errors: errors.map((error) => {
        return error.msg;
      }),
      field_errors: errors
    });
  }

  next();
});

// route to authenticate a user (POST /user/login)
routes.post('/login', function(request, response) {
  return helpers.auth.local_login.apply(this, arguments);
});

routes.post('/register', (request, response, next) => {

  // Validate fields
  request.checkBody('email', 'Invalid email address.').isEmail();
  request.checkBody('username', 'Username is required.').notEmpty();
  request.checkBody('password', 'Password is required.').notEmpty();
  // request.checkBody('password2', 'Passwords should match.').equals(request.body.password);

  let errors = request.validationErrors();
  if (errors) {

    return response.status(400).json({
      success: false,
      errors: errors,
      errors: errors.map((error) => {
        return error.msg;
      }),
      field_errors: errors
    });
  }

  next();
});

// route to register new user (PUT /user/register)
routes.post('/register', function(request, response) {
  return helpers.auth.register.apply(this, arguments);
});
