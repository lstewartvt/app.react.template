var HeaderLogo = require('./HeaderLogo');
var NavMenu = require('app_modules/layout/nav/NavMenu');

const Header = () => (
  <header id="header" className="navbar navbar-fixed-top">
    <div id="nav-bar" className="container mui-appbar mui--appbar-line-height">
      <HeaderLogo />
      <NavMenu />
    </div>
  </header>
);

module.exports = Header;