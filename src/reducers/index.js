import {
  combineReducers
} from 'redux';

import auth from './auth';
import glob from './global';
import {
  reducer as form
} from 'redux-form';

const reducers = combineReducers({
  auth,
  glob,
  form
});

export default reducers;
