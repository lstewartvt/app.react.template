require('./includes');

const bodyParser = require('body-parser');
const compression = require('compression');
const config = includes('data/config');
const cookieParser = require('cookie-parser');
const Cookies = require('cookies');
const express = require('express');
const helpers = includes('helpers/');
const morgan = require('morgan');
const path = require('path');
const props = includes('properties');

var app = express();

// try connect to mongodb
if(process.env.mongo_db_connection) {
  console.log('Connecting to mongodb...');

  const bluebird = require('bluebird');
  let mongoose = require('mongoose');
  mongoose.Promise = bluebird;
  mongoose.connect(process.env.mongo_db_connection);
} else {
  console.log('Mongo connection not found...skipping...');
}

// Setup logger
app.use(morgan('dev'));
// app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :response[content-length] :response-time ms'));

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add cookie manager
app.use(cookieParser());
app.use(Cookies.express());

// We only want to optimize assets in production environment
if (app.settings.env === 'production') {

  // load gzipped assets
  app.get(/\.(js)$/, function(request, response, next) {
    request.url = request.url + '.gz';
    response.set('Content-Encoding', 'gzip');
    next();
  });

  // Use gzip compression
  app.use(compression());
}

// Serve static assets
app.use(express.static(path.resolve(__dirname, './../dist')));

// Set up authentication
helpers.auth.init.call(app);

module.exports = app;
