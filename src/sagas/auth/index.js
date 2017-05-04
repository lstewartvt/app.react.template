import * as glob from 'sagas/global.helper';

import {
  call,
  put,
  takeEvery
} from 'redux-saga/effects';

export function* check_auth() {

  yield takeEvery('app.auth.check', function*() {

    try {

      const response = yield call(utils.ajax.get, {
        endpoint: config.app.nav.account.auth
      });
      const data = response.data;

      // update user
      yield put({
        type: 'app.auth.success',
        user: data.user
      });
    } catch (error) {

      yield call(glob.handleErrors, error)
      yield put({
        type: 'app.auth.error'
      });

      // redirect to login
      ReactRouter.browserHistory.push(config.app.nav.account.login);
    }
  });
};

export function* login() {

  yield takeEvery('app.auth.request', function*(action) {

    try {

      let response = yield call(utils.ajax.post, {
        endpoint: config.app.nav.account.login,
        body: action.data
      });
      const data = response.data;

      // store auth cookies
      utils.cookies.set(config.app.auth.cookie_name, data.token, {
        path: '/',
        secure: _secure
      });

      // update user
      yield put({
        type: 'app.auth.success',
        user: data.user
      });

      // redirect to home
      ReactRouter.browserHistory.push(config.app.nav.home);
    } catch (error) {

      const data = yield call(glob.handleErrors, error)
      yield put({
        type: 'app.auth.error',
        field_errors: data.field_errors,
        errors: data.errors,
        messages: data.messages
      });
    }
  });
};

export function* register() {

  yield takeEvery('app.auth.register', function*(action) {

    try {

      const response = yield call(utils.ajax.post, {
        endpoint: config.app.nav.account.register,
        body: action.data
      });
      const data = response.data;

      // show success message
      yield put({
        type: 'app.auth.registered',
        messages: [config.app.messages.register.success.replace('{user}', data.user.handle)],
        user: data.user
      });

      // redirect to home
      ReactRouter.browserHistory.push(config.app.nav.account.login);
    } catch (error) {

      const data = yield call(glob.handleErrors, error)
      yield put({
        type: 'app.auth.error',
        field_errors: data.field_errors,
        errors: data.errors,
        messages: data.messages
      });
    }
  });
};

export function* verify() {

  yield takeEvery('app.auth.verify', function*(action) {

    try {

      const response = yield call(utils.ajax.post, {
        endpoint: endpoint,
        method: 'POST'
      });
      const data = response.data;

      // store auth cookies
      utils.cookies.set(config.app.auth.cookie_name, data.token, {
        path: '/',
        secure: _secure
      });

      // update user 
      yield put({
        type: 'app.auth.verified',
        user: data.user
      });
    } catch (error) {

      yield call(glob.handleErrors, error)
      yield put({
        type: 'app.auth.error'
      });

      // redirect to login 
      ReactRouter.browserHistory.push(config.app.nav.account.login);
    }
  });
};
