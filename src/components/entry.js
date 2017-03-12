import 'global/';
import 'global/imports';

import Routes from 'Routes';

import 'styles/reset'
import 'styles/base'

window.onload = () => {
  
  ReactDOM.render(
    <Routes />,
    document.getElementById('app')
  );
};