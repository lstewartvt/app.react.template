var app_data = require('app_modules/app.data');
var menu = require('./menu.data');

const NavMenu = (props) => (
  <ul className="nav navbar-nav navbar-right">
    {
      menu.map((link, index) => (
        <li
          className="mui--hidden-xs"
          key={`nav-link-${index}`}>
          <ReactRouter.IndexLink
            activeClassName="active"
            to={app_data.nav[link.id]}>
            {link.title}
          </ReactRouter.IndexLink>
        </li>
      ))
    }
    <li className="mui--hidden-xs">
      <ReactRouter.IndexLink
        to="404"
        activeClassName="active">
        Error 404
      </ReactRouter.IndexLink>
    </li>
    <li className="nav-slide-toggle hide-nav-slide sidedrawer-toggle mui--visible-xs-inline-block mui--visible-sm-inline-block">
      <i className="icon fa"></i>
    </li>
  </ul>
);

module.exports = NavMenu;