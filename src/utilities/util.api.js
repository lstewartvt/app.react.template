import promise from 'es6-promise';
import 'isomorphic-fetch';
promise.polyfill();

const api = {

	request: (request) => {
		return fetch(request.endpoint, {
			method: request.method || 'GET',
			headers: {
				...request.headers,
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'X-Auth': utils.cookies.get(app_data.auth.cookie_name),
				'X-User': utils.cookies.get(app_data.auth.user_cookie)
			},
			body: JSON.stringify(request.body)
		});
	}
};

export default api;