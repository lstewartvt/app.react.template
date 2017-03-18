const injectTapEventPlugin = require('react-tap-event-plugin');

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import Router from 'Router';

import 'styles/reset'
import 'styles/base'

window.onload = () => {
  
  ReactDOM.render(
    <Router />,
    document.getElementById('app')
  );
};