module.exports = {
  admin: {
    email: process.env.admin_email
  },
  google: {
    password: process.env.google_password,
    user: process.env.google_user
  },
  messages: {
    auth: {
      failed: 'Authentication failed: please retry credentials.'
    },
    error: {
      default: 'An unknown error has occurred.'
    },
    mongoose: {
      11000: 'Registration failed: handle and/or email already exists.'
    }
  }
};
