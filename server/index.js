const app = require('./app');
const environments = require('gulp-environments');

const PORT = process.env.PORT || 27773;

console.log(`Starting server in ${environments.current().$name} mode...`);

// We only want to run the workflow in development environment
if (environments.development()) {

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
