import {
	AUTHENTICATE_ERROR,
	AUTHENTICATED_USER,
	RESET_FORM,
	UNAUTHENTICATED_USER
} from './types';

const API_URL = ''; //'http://react.app.k0nrt15.com';

export function checkAuth() {
	return dispatch => {

		return api.request({
				endpoint: `${API_URL}${app_data.nav.account.protected}`
			}).then(response => {
				return handleErrors(response, dispatch, AUTHENTICATE_ERROR);
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

export function handleErrors(response, dispatch, type) {

	if (!response.ok || response.status >= 400) {
		if (response.status === 401) {
			dispatch({
				type: type,
				payload: 'You are not authorized to do this. Please login and try again.'
			});
			logout();
		}

		return response.json().then(data => {

			dispatch({
				type: AUTHENTICATE_ERROR,
				field_errors: data.field_errors,
				errors: data.errors
			});
			throw new Error(data.errors && data.errors.join('\n'));
		});
	}

	return response.json();
};

export function login({
	username,
	password
}) {
	return dispatch => {

		return api.request({
				endpoint: `${API_URL}${app_data.nav.account.login}`,
				method: 'POST',
				body: {
					username,
					password
				}
			}).then(response => {
				return handleErrors(response, dispatch, AUTHENTICATE_ERROR);
			})
			.then(data => {
				AppCookies.save(app_data.auth.cookie_name, data.token, {
					path: '/',
					secure: _secure
				});
				dispatch({
					type: AUTHENTICATED_USER
				});
				ReactRouter.browserHistory.push(app_data.nav.home);
			})
			.catch(error => console.error(error.message));
	}
};

export function register({
	email,
	username,
	password
}) {
	return function(dispatch) {
		api.request({
				endpoint: `${API_URL}${app_data.nav.account.register}`,
				method: 'POST',
				body: {
					email,
					username,
					password
				}
			})
			.then(response => {
				return handleErrors(response, dispatch, AUTHENTICATE_ERROR);
			})
			.then(data => {
				AppCookies.save(app_data.auth.cookie_name, data.token, {
					path: '/',
					secure: _secure
				});
				dispatch({
					type: AUTHENTICATED_USER
				});
				ReactRouter.browserHistory.push(app_data.nav.home);
			})
			.catch(error => console.log(error.message));
	}
};

export function logout() {
	return function(dispatch) {
		api.request({
				endpoint: `${API_URL}${app_data.nav.account.logout}`
			})
			.then(response => {
				return handleErrors(response, dispatch, AUTHENTICATE_ERROR);
			})
			.then(data => {
				AppCookies.remove(app_data.auth.cookie_name);
				dispatch({
					type: UNAUTHENTICATED_USER
				});
				ReactRouter.browserHistory.push(app_data.nav.account.login);
			})
			.catch(error => console.log(error.message));
	}
};