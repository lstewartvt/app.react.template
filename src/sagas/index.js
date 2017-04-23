import * as global_helper from './global.helper';
import {
	handleErrors
}
from 'sagas/global.helper';

import {
	call,
	put,
	takeEvery
} from 'redux-saga/effects';

export function* logout() {

	yield takeEvery('app.auth.revoke', function* logoutFlow(action) {

		try {

			const result = yield call(global_helper.logout);
			const response = yield call(handleErrors, result);

			AppCookies.remove(app_data.auth.cookie_name);
			yield put({
				type: 'app.auth.revoked'
			});

			// redirect to login
			ReactRouter.browserHistory.push(app_data.nav.account.login);
		} catch (response) {

			yield put({
				type: 'app.auth.error',
				field_errors: response.field_errors,
				errors: response.errors
			});
		}
	});
};

export function* toggleNav() {
	return function(dispatch) {
		dispatch({
			type: 'app.toggle.nav'
		});
	}
};