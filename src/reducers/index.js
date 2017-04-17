import {
	combineReducers
} from 'redux';

import auth_reducer from './auth.reducer';
import global_reducer from './global.reducer';
import {
	reducer as form_reducer
} from 'redux-form';

const reducers = combineReducers({
	auth: auth_reducer,
	global: global_reducer,
	form: form_reducer
});

export default reducers;