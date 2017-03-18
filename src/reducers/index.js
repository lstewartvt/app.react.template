import { combineReducers } from 'redux';

import auth_reducer from './auth.reducer.js';
import { reducer as form_reducer } from 'redux-form';

const reducers = combineReducers({
  auth: auth_reducer,
  form: form_reducer
});

export default reducers;
