import {
	toggleNav
} from 'sagas';

import {
	AppBar
} from 'react-toolbox/lib/app_bar';
import HeaderLogo from './HeaderLogo';
import {
	NavMenu
} from 'layout/nav';

import './styles/Header';

export class Header extends React.Component {

	handleLeftIconClick() {
		ReactRouter.browserHistory.push(app_data.nav.home);
	};

	render() {
		return (
			<AppBar
        className='header'
        fixed
        leftIcon='home'
        onLeftIconClick={this.handleLeftIconClick.bind(this)}
        onRightIconClick={this.props.toggleNav}
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

export default ReactRedux.connect(mapStateToProps, {
	toggleNav
})(Header);