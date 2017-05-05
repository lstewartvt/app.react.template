import * as auth_sagas from 'sagas/auth';
import * as global_sagas from 'sagas';

let saga_count = 0;
let saga_hash = {};
let sagas = {
  auth: {
    gens: auth_sagas
  },
  global: {
    gens: global_sagas
  }
};

export default (sagaMiddleware) => {

  for (var name in sagas) {
    saga_hash[name] = [];
    const saga = sagas[name];
    for (var key in saga.gens) {
      const generator = saga.gens[key];
      sagaMiddleware.run(generator);
      saga_hash[name].push(key);
      saga_count++;
    }
    saga_hash[name].sort();
  };

  // track running sagas
  utils.log.debug(`${saga_count} running sagas...`, saga_hash);
};
