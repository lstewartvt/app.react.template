import * as auth_helper from './auth.helper';
import {
	handleErrors
} from 'sagas/global.helper';

import {
	call,
	put,
	takeEvery
} from 'redux-saga/effects';

export function* checkAuth() {

	yield takeEvery('app.auth.check', function*() {

		try {

			const result = yield call(auth_helper.checkAuth);
			const response = yield call(handleErrors, result);

			// update user 
			yield put({
				type: 'app.auth.success',
				user: response.user
			});
		} catch (response) {

			yield put({
				type: 'app.auth.error'
			});

			// redirect to login 
			ReactRouter.browserHistory.push(app_data.nav.account.login);
		}
	});
};

export function* login() {
	yield takeEvery('app.auth.request', function*(action) {

		try {

			const result = yield call(auth_helper.login, action.form);
			const response = yield call(handleErrors, result);

			// store auth cookies
			utils.cookies.set(app_data.auth.cookie_name, response.token, {
				path: '/',
				secure: _secure
			});

			// update user
			yield put({
				type: 'app.auth.success',
				user: response.user
			});

			// redirect to home
			ReactRouter.browserHistory.push(app_data.nav.home);
		} catch (response) {

			yield put({
				type: 'app.auth.error',
				field_errors: response.field_errors,
				errors: response.errors,
				messages: response.messages
			});

			if (_debug) {
				throw new Error(response);
			}
		}
	});
};

export function* register() {

	yield takeEvery('app.auth.register', function*(action) {

		try {

			const result = yield call(auth_helper.register, action.form);
			const response = yield call(handleErrors, result);

			// show success message
			yield put({
				type: 'app.auth.registered',
				messages: [app_data.messages.register.success.replace('{user}', response.user.handle)],
				user: response.user
			});

			// redirect to home
			ReactRouter.browserHistory.push(app_data.nav.account.login);
		} catch (response) {

			yield put({
				type: 'app.auth.error',
				field_errors: response.field_errors,
				errors: response.errors,
				messages: response.messages
			});

			if (_debug) {
				throw new Error(response);
			}
		}
	});
};

export function* verify() {

	yield takeEvery('app.auth.verify', function*(action) {

		try {

			const result = yield call(auth_helper.verify, action.endpoint);
			const response = yield call(handleErrors, result);

			// store auth cookies
			utils.cookies.set(app_data.auth.cookie_name, response.token, {
				path: '/',
				secure: _secure
			});

			// update user 
			yield put({
				type: 'app.auth.verified',
				user: response.user
			});
		} catch (response) {

			yield put({
				type: 'app.auth.error'
			});

			// redirect to login 
			ReactRouter.browserHistory.push(app_data.nav.account.login);
		}
	});
};