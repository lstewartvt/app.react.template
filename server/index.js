const app = require('./app');

const PORT = process.env.PORT || 27773;
const PORT_SECURE = process.env.PORT_SECURE || 8731;

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

// Start servers
const fs = require('fs'),
	http = require('http'),
	https = require('https');

const httpServer = http.createServer(app);

// const httpsServer = https.createServer({
// 	pfx: fs.readFileSync('ssl/cert.pfx'),
// 	passphrase: process.env.ssl_passphrase
// }, app);

// Start server
httpServer.listen(PORT, () => {
	console.log(`Magic is being served up at http://localhost:${PORT}`);
});

// Start secure server in DEV (heroku will handle https in production)
// if (app.settings.env === 'development') {

//   httpsServer.listen(PORT_SECURE, () => {
//     console.log(`Magic is being served up at https://localhost:${PORT_SECURE}`);
//   });
// }