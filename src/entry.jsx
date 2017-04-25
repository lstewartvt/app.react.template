import createSagaMiddleware from 'redux-saga'
import reduxThunk from 'redux-thunk';
import reducers from 'reducers';
import Router from 'Router';
import sagas from 'components/sagas';

import 'styles/reset';
import 'styles/base';

const createStoreWithMiddleware = Redux.applyMiddleware(reduxThunk)(Redux.createStore);
const sagaMiddleware = createSagaMiddleware();
const store = createStoreWithMiddleware(
	reducers,
	Redux.applyMiddleware(sagaMiddleware)
);

// run sagas
sagas(sagaMiddleware);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

// used for dangerouslySetInnerHtml
window.createMarkup = function(markup) {
	return {
		__html: markup
	};
}

window.onload = () => {

	ReactDOM.render(
		<ReactRedux.Provider store={store}>
      <Router />
    </ReactRedux.Provider>,
		document.getElementById('app')
	);
};