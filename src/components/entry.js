var injectTapEventPlugin = require('react-tap-event-plugin');

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

var Routes = require('./Routes');

window.onload = () => {
  ReactDOM.render(
    <Routes />,
    document.getElementById('app')
  );
};
