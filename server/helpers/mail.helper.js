const mailer = require('express-mailer');
const props = includes('properties');

var handleSendError = (error) => {
  throw new Error(error);
};

// Set up smtp
let mail_helper = module.exports = {
  app: undefined,
  init: function() {

    mail_helper.app = this;
    mailer.extend(mail_helper.app, {
      from: process.env.admin_email,
      host: 'smtp.gmail.com', // hostname
      secureConnection: true, // use SSL
      port: 465, // port for secure SMTP
      transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
      auth: {
        user: process.env.google_user,
        pass: process.env.google_password
      }
    });
  },
  send: function(message, callback) {

    mail_helper.app.mailer.send(message.template, message.config, function(error) {
      if (error) {
        handleSendError(error);
      }

      if (callback && typeof callback === 'function') {
        callback();
      }
    });
  }
};
