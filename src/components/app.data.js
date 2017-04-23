module.exports = {
	auth: {
		cookie_name: '.auth',
		expire: 1440, // in minutes
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