import {
	createStore,
	applyMiddleware
} from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from 'reducers';

import {
	AUTHENTICATED_USER
} from 'actions/auth/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const injectTapEventPlugin = require('react-tap-event-plugin');

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// check auth on load
const auth = AppCookies.load(app_data.auth.cookie_name);
const mongo_live = AppCookies.load('mongo_live');
if (!mongo_live || (mongo_live && auth)) {
	store.dispatch({
		type: AUTHENTICATED_USER
	});
}

// used for dangerouslySetInnerHtml
window.createMarkup = function(markup) {
	return {
		__html: markup
	};
}

import Router from 'Router';

import 'styles/reset';
import 'styles/base';

window.onload = () => {

	ReactDOM.render(
		<ReactRedux.Provider store={store}>
      <Router />
    </ReactRedux.Provider>,
		document.getElementById('app')
	);
};