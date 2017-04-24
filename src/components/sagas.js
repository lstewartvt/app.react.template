import * as auth_sagas from 'sagas/auth';
import * as global_sagas from 'sagas';

let sagas = [];
export default (sagaMiddleware) => {

	for (var key in auth_sagas) {
		sagaMiddleware.run(auth_sagas[key]);
		sagas.push(key);
	};

	for (var key in global_sagas) {
		sagaMiddleware.run(global_sagas[key]);
		sagas.push(key);
	};

	// track running sagas in development environment
	if (_debug) {
		console.debug(`${sagas.length} sagas running...`, sagas.sort());
	}
};