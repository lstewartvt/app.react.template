module.exports = {
  auth: {
    cookie_name: '.auth',
    expire: 1440, // in minutes
    secret: process.env.auth_secret
  },
  connections: { 
    mongodb: 'mongodb://localhost:27017/app_react'
  }
};
