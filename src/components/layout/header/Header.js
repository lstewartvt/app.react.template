import { AppBar } from 'react-toolbox/lib/app_bar';
import HeaderLogo from './HeaderLogo';
import NavMenu from 'layout/nav/NavMenu';

import styles from './styles/Header.css';

export default class Header extends React.Component {

  constructor() {
    super();

    this.state = {
      active: false
    };
  };

  render() {
    return (
      <AppBar
        id="header"
        className="header"
        leftIcon="menu"
        rightIcon="menu"
        title={<HeaderLogo />}>
        {/*<div id="nav-bar" className="container mui-appbar mui--appbar-line-height">
          <HeaderLogo />
        </div>*/}
        <NavMenu />
      </AppBar>
    );
  };
};