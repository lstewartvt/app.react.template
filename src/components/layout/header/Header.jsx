import {
	AppBar
} from 'react-toolbox/lib/app_bar';
import HeaderLogo from './HeaderLogo';
import {
	NavMenu
} from 'layout/nav';

import './styles/Header';

export class Header extends React.Component {

	handleHomeClick() {
		ReactRouter.browserHistory.push(app_data.nav.home);
	};

	handleMenuClick() {
		this.props.dispatch({
			type: 'app.toggle.nav'
		});
	};

	render() {
		return (
			<AppBar
        className='header'
        fixed
        leftIcon='home'
        onLeftIconClick={this.handleHomeClick.bind(this)}
        onRightIconClick={this.handleMenuClick.bind(this)}
        rightIcon='menu'
        title={'React.App'||<HeaderLogo />}>
        <NavMenu />
      </AppBar>
		);
	};
};

function mapStateToProps(state) {
	return {
		nav_open: state.global.nav_open
	};
};

export default ReactRedux.connect(mapStateToProps)(Header);