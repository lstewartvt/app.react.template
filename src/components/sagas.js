import * as auth_sagas from 'sagas/auth';
import * as global_sagas from 'sagas';

export default (sagaMiddleware) => {

	for (var key in auth_sagas) {
		sagaMiddleware.run(auth_sagas[key]);
	};

	for (var key in global_sagas) {
		sagaMiddleware.run(global_sagas[key]);
	};
};