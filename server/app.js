require('./includes');

const cookieParser = require('cookie-parser');
const express = require('express');
const mail = includes('helpers/mail.helper');
const morgan = require('morgan');
const path = require('path');
const props = require('./properties');

const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Add cookie manager
app.use(cookieParser());

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'dist')));

// Set up smtp
mail.init.call(app);

app.get('/contact', (request, response) => {

  var message = {
    config: {
      subject: 'Test React Contact Template',
      to: 'lstewartvt@gmail.com'
    },
    handleError: undefined,
    handleSuccess: undefined,
    response: response,
    template: 'contact'
  };

  mail.send.call(app, message);
});

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
});

module.exports = app;