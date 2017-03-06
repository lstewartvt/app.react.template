import 'global/';
import 'global/imports';

import Routes from 'Routes';

window.onload = () => {
  
  ReactDOM.render(
    <Routes />,
    document.getElementById('app')
  );
};
