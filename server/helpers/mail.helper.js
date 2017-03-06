const mailer = require('express-mailer');
const props = includes('properties');

var handleSendError = (error, response) => {
  console.log(error);
  response.send('There was an error sending the email');
};

var handleSendSuccess = (response) => {
  console.log('Email sent successfully');
  response.send('Email sent successfully');
};

// Set up smtp
module.exports = {
  init: function() {

    var app = this;

    mailer.extend(app, {
      from: props.admin.email,
      host: 'smtp.gmail.com', // hostname
      secureConnection: true, // use SSL
      port: 465, // port for secure SMTP
      transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
      auth: {
        user: props.google.user,
        pass: props.google.password
      }
    });

    // set mail templates
    app.set('views', __dirname + '/../templates/mail');
    app.set('view engine', 'jade');
  },
  send: function(message) {

    var app = this;

    app.mailer.send(message.template, message.config, function(error) {
      if (error) {
        (message.handleError || handleSendError)(error, message.response);
        return;
      }

      (message.handleSuccess || handleSendSuccess)(message.response);
    });
  }
};
