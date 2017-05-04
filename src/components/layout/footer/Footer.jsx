const app_data = require('app.data');

import './styles/Footer';

export default class Footer extends React.Component {

	render() {
		return (
			<footer id='footer' className='mui--appbar-height'>
        <p className='mui-container-fluid'>
          &copy;&nbsp;
          {config.app.date.getFullYear()} &ndash; React.App
          <span className='tm'>&trade;</span>
        </p>
      </footer>
		);
	};
};