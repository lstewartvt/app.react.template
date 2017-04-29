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
    },
    register: {
      success: 'Welcome, {user}! Please check your email and verify your account before logging in.'
    }
  },
  nav: {
    about: '/about',
    contact: '/contact',
    donate: '/donate',
    home: '/',
    projects: '/projects',
    restricted: '/restricted',
    team: '/team',
    account: {
      auth: '/auth',
      login: '/login',
      loginResend: '/login?emailed={success}',
      logout: '/logout',
      register: '/register',
      verify: '/verify'
    },
    anonymous: [
      '/login',
      '/register'
    ],
    format: {
      verify: '/verify/:token'
    },
    redirect: {
      restricted: '/login',
      timeout: 13131,
      verify: '/'
    }
  }
};
