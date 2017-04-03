import promise from 'es6-promise';
import 'isomorphic-fetch';
promise.polyfill();

let api = module.exports = {

	request: (request) => {
		return fetch(request.endpoint, {
			method: request.method || 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				...request.headers
			},
			body: JSON.stringify(request.body)
		});
	}
};