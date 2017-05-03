import * as glob from './global.helper';
import {
	call,
	put,
	takeEvery
} from 'redux-saga/effects';

export function* logout() {

	yield takeEvery('app.auth.revoke', function*(action) {

		try {

			yield call(utils.ajax.get, {
				endpoint: app_data.nav.account.logout
			});

			utils.cookies.remove(app_data.auth.cookie_name);

			yield put({
				type: 'app.auth.revoked'
			});

			// redirect to login
			ReactRouter.browserHistory.push(app_data.nav.account.login);
		} catch (error) {

			const data = yield call(glob.handleErrors, error)
			yield put({
				type: 'app.auth.error',
				errors: data.errors
			});
		}
	});
};