const url = require('url');

const PORT = process.env.PORT || 8713;
const PORT_SECURE = process.env.PORT_SECURE || 8731;

// Http helper methods
const http_helper = module.exports = {
	full_url: (request) => {

		var url_parts = url.parse(request.originalUrl);
		url_parts.host = request.get('host');
		url_parts.protocol = request.protocol;
		var full_url = url.format(url_parts);
		return full_url;
	},
	secure: (request, response, next) => {

		const isSecure = request.secure;
		const isSecureHeroku = request.headers['x-forwarded-proto'] === 'https';
		if (isSecure || isSecureHeroku) {
			return next();
		}

		let host = request.get('host');
		if (request.app.settings.dev) {
			host = host.replace(PORT, PORT_SECURE);
		}

		const secure_path = 'https://' + host + request.url;
		console.log('Redirecting from ' + http_helper.full_url(request) + ' to secure path: ' + secure_path);
		return response.redirect(secure_path);
	}
};