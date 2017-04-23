import promise from 'es6-promise';
import 'isomorphic-fetch';
promise.polyfill();

let util_api = module.exports = {

	request: (request) => {
		return fetch(request.endpoint, {
			method: request.method || 'GET',
			headers: {
				...request.headers,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(request.body)
		});
	}
};