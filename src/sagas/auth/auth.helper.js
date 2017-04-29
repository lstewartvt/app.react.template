import {
  API_URL,
  handleErrors
} from 'sagas/global.helper';

export function checkAuth() {
  return utils.api.request({
    endpoint: app_data.nav.account.auth
  });
};

export function login({
  username,
  password
}) {

  return utils.api.request({
    endpoint: app_data.nav.account.login,
    method: 'POST',
    body: {
      username,
      password
    }
  });
};

export function register({
  email,
  username,
  password
}) {

  return utils.api.request({
    endpoint: app_data.nav.account.register,
    method: 'POST',
    body: {
      email,
      username,
      password
    }
  });
};

export function verify(endpoint) {

  return utils.api.request({
    endpoint: endpoint,
    method: 'POST'
  });
};
