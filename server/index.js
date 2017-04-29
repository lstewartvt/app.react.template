const app = require('./app');

const PORT = process.env.PORT || 27773;

console.log(`Starting server in ${app.settings.env} mode...`);
// We only want to run webpack in development environment
if (app.settings.env === 'development') {

  console.log('Setting DEV environment variables...');
  const vars = require('dotenv').config();

  console.log('Turning on WebPack Middleware...');
  const webpack = require('./webpack');
  webpack.use.call(app);
}

// set routes
require('./routes/')(app);

var server = app.listen(PORT, () => {
  var host = server.address().address;
  var port = server.address().port;

  console.log(`Magic is being served up at http://${host === '::' ? 'localhost' : host}:${port}`);
});
