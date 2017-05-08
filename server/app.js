require('./includes');

const bodyParser = require('body-parser'),
  compression = require('compression'),
  cookieParser = require('cookie-parser'),
  Cookies = require('cookies'),
  express = require('express'),
  expressValidator = require('express-validator'),
  helpers = includes('helpers/'),
  morgan = require('morgan'),
  passport = require('./passport'),
  path = require('path'),
  props = includes('properties');

var app = express();
app.set('dev', app.settings.env === 'development');
app.set('prod', app.settings.prod);

// try connect to mongodb
console.log(process.env.mongo_db_connection);
if (process.env.mongo_db_connection) {
  console.log('Connecting to mongodb...');

  const bluebird = require('bluebird');
  let mongoose = require('mongoose');
  mongoose.Promise = bluebird;

  mongoose.connect(process.env.mongo_db_connection).then(() => {
    app.set('mongo_live', true);
    console.log('Connected to mongodb successfully!');
  }).catch((error) => {
    console.log('Error:', error);
    console.log(`Unable to connect to ${process.env.mongo_db_connection}. Please restart the server.`);
  });

  // close the mongoose connection if Node process ends
  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log('Disconnected mongodb due to app termination.');
      process.exit(0);
    });
  });
} else {
  console.log('Mongo connection not found...skipping...');
}

// Setup logger
app.use(morgan('dev'));
// app.use(morgan(':remote-addr - :remote-user [:date[clf]] ':method :url HTTP/:http-version' :status :response[content-length] :response-time ms'));

// Enable CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({
  extended: false
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// Add cookie manager
app.use(cookieParser());
app.use(Cookies.express());

// Validation
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

// We only want to optimize assets in production environment
if (app.settings.prod) {

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

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());


module.exports = app;
