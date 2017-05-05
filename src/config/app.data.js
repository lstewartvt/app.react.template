module.exports = {
  auth: {
    anon: 'Anonymous',
    cookie_name: '.auth',
    expire: 1440, // in minutes
    header: {
      token: 'Authorization',
      token_lower: 'authorization'
    }
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
    checkout: '/checkout',
    confirm: '/confirmation',
    diet: '/my-diet',
    dishes: '/dishes',
    home: '/',
    places: '/',
    restricted: '/restricted',
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
      checkout: '/checkout/:token',
      confirmation: '/confirmation?transactions=:transactionIds',
      menu: '/menus/:placeNameId/:menuId',
      verify: '/verify/:token',
      account: {
        confirm: '/account/confirm/:userId',
        oAuth: '/account/oauth/:provider/:accessToken',
        reset: '/account/password/reset/:userId'
      },
      manage: {
        place: '/admin/manage/place/:placeNameId'
      }
    },
    redirect: {
      restricted: '/login',
      timeout: 13131,
      verify: '/my-diet'
    }
  },
  search: {
    dishes: true,
    places: true,
    profile: true
  },
  timers: {
    toaster: 3113
  }
};
