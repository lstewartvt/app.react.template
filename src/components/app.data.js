module.exports = {
	auth: {
		cookie_name: '.auth',
		expire: 1440 // in minutes
	},
	date: new Date(),
	nav: {
		about: '/about',
		account: {
			login: '/login',
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