require('./includes');

const bluebird = require('bluebird');
const bodyParser = require('body-parser');
const config = includes('data/config');
const cookieParser = require('cookie-parser');
const Cookies = require('cookies');
const express = require('express');
const helpers = includes('helpers/');
var mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const props = includes('properties');

var app = express();

mongoose.Promise = bluebird;
mongoose.connect(config.connections.mongodb); // connect to database

// Setup logger
app.use(morgan('dev'));
// app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :response[content-length] :response-time ms'));

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add cookie manager
app.use(cookieParser());
app.use(Cookies.express());

// Serve static assets
app.use(express.static(path.resolve(__dirname, './../dist')));

// Set up authentication
helpers.auth.init.call(app);

module.exports = app;