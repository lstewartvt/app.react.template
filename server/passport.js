const _ = require('lodash'),
	app_data = includes('../src/components/app.data'),
	ExtractJwt = require('passport-jwt').ExtractJwt,
	helpers = includes('helpers/'),
	JwtStrategy = require('passport-jwt').Strategy,
	LocalStrategy = require('passport-local'),
	passport = require('passport'),
	User = includes('data/models/User.schema');

let cookieExtractor = function(request) {

	let token = request.headers[app_data.auth.header.token_lower];
	if (!token && (request && request.cookies)) {
		token = request.cookies.get(app_data.auth.cookie_name);
	}

	return token;
};

const jwtOptions = {
	// Telling Passport to check cookies for JWT
	jwtFromRequest: cookieExtractor || ExtractJwt.fromAuthHeader(),
	// Telling Passport where to find the secret
	secretOrKey: process.env.auth_secret
};

// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {

	return User.getUserById(payload._id).then(user => {
		if (user) {
			return done(null, user.transform());
		} else {
			return done(null, false);
		}
	}).catch(error => {
		return done(error, false);
	});
});

// Setting up local login strategy
const localLogin = new LocalStrategy(function(username, password, done) {
	helpers.auth.login.apply(this, arguments);
});

passport.use(jwtLogin);
passport.use(localLogin);

module.exports = passport;