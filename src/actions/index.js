import {
	AUTHENTICATE_ERROR,
	AUTHENTICATED_USER,
	RESET_FORM,
	UNAUTHENTICATED_USER
} from './types';

const API_URL = ''; //'http://react.app.k0nrt15.com';

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
				payload: data.message
			});
			throw new Error(data.message);
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
	handle,
	password
}) {
	return function(dispatch) {
		api.request({
				endpoint: `${API_URL}${app_data.nav.account.register}`,
				method: 'POST',
				body: {
					email,
					handle,
					password
				}
			})
			.then(response => {
				return handleErrors(response, dispatch, AUTHENTICATE_ERROR);
			})
			.then(data => {
				AppCookies.save(app_data.auth.cookie_name, data.token, {
					path: '/'
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
		dispatch({
			type: UNAUTHENTICATED_USER
		});
		AppCookies.remove(app_data.auth.cookie_name, {
			path: '/'
		});
		ReactRouter.browserHistory.push(app_data.nav.account.login);
	}
};