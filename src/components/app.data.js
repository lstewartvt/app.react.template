module.exports = {
	auth: {
		cookie_name: '.auth',
		expire: 1440, // in minutes
		header: {
			token: 'X-Auth',
			token_lower: 'x-auth'
		},
		user_cookie: '.user'
	},
	date: new Date(),
	messages: {
		auth: {
			failed: 'Authentication failed: please try again.',
			unverified: 'Authentication failed: please login/register to continue.'
		},
		error: {
			default: 'An unknown error has occurred.'
		}
	},
	nav: {
		about: '/about',
		account: {
			auth: '/auth',
			login: '/login',
			logout: '/logout',
			register: '/register'
		},
		anonymous: [
			'/login',
			'/register'
		],
		contact: '/contact',
		donate: '/donate',
		home: '/',
		projects: '/projects',
		team: '/team'
	}
};