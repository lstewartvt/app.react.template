import {
	API_URL,
	handleErrors
} from 'sagas/global.helper';

export function checkAuth() {
	return dispatch => {

		return util_api.request({
				endpoint: app_data.nav.account.auth
			}).then(response => {
				return handleErrors(response, dispatch, {
					type: 'app.auth.error'
				});
			})
			.then(data => {
				dispatch({
					type: PROTECTED_TEST,
					payload: response.data.content
				});
			})
			.catch(error => console.error(error.message));
	}
};

export function login({
	username,
	password
}) {

	return util_api.request({
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

	return util_api.request({
		endpoint: app_data.nav.account.register,
		method: 'POST',
		body: {
			email,
			username,
			password
		}
	});
};