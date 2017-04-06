import {
	AppBar
} from 'react-toolbox/lib/app_bar';
import HeaderLogo from './HeaderLogo';
import {
	NavMenu
} from 'layout/nav';

import './styles/Header';

export default class Header extends React.Component {

	constructor(props) {
		super(props);
	};

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
        onRightIconClick={this.props.handleNavToggle}
        rightIcon='menu'
        title={'React.App'||<HeaderLogo />}>
        <NavMenu />
      </AppBar>
		);
	};
};