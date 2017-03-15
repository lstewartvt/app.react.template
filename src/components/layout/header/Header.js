import { AppBar } from 'react-toolbox/lib/app_bar';
import HeaderLogo from './HeaderLogo';
import NavMenu from 'layout/nav/NavMenu';

import './styles/Header.scss';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <AppBar
        className="header"
        fixed
        onRightIconClick={this.props.handleNavToggle}
        rightIcon="menu"
        title={<HeaderLogo />}>
        <NavMenu />
      </AppBar>
    );
  };
};