import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from 'reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);  
const store = createStoreWithMiddleware(reducers);

const injectTapEventPlugin = require('react-tap-event-plugin');

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import Router from 'Router';

import 'styles/reset'
import 'styles/base'

window.onload = () => {

  ReactDOM.render(
    <Provider store={store}>
      <Router />
    </Provider>,
    document.getElementById('app')
  );
};
