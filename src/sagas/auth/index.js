import * as auth_helper from './auth.helper';
import {
	handleErrors
} from 'sagas/global.helper';

import {
	call,
	put,
	takeEvery
} from 'redux-saga/effects';

export function* login() {
	yield takeEvery('app.auth.request', function* loginFlow(action) {

		try {

			const result = yield call(auth_helper.login, action.form);
			const response = yield call(handleErrors, result);

			// store auth cookies
			AppCookies.save(app_data.auth.cookie_name, response.token, {
				path: '/',
				secure: _secure
			});
			AppCookies.save(app_data.auth.user_cookie, response.user._id, {
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
				errors: response.errors
			});
		}
	});
};
export function* register() {

	yield takeEvery('app.auth.register', function* registerFlow(action) {

		try {

			const result = yield call(auth_helper.register, action.form);
			const response = yield call(handleErrors, result);

			AppCookies.save(app_data.auth.cookie_name, response.token, {
				path: '/',
				secure: _secure
			});
			AppCookies.save(app_data.auth.user_cookie, response.user._id, {
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
				errors: response.errors
			});

			if (_debug) {
				throw new Error(response);
			}
		}
	});
};