import Link from 'react-toolbox/lib/link';
import Navigation from 'react-toolbox/lib/navigation';

import app_data from 'app.data';
import menu from './menu.data';

export default class NavMenu extends React.Component {

  render() {
    return (
      <Navigation
        className="mui--hidden-xs"
        type="horizontal">
        {
          menu.map((link, index) => (
            <ReactRouter.IndexLink
              key={`nav-link-${index}`}
              activeClassName="active"
              to={app_data.nav[link.id]}>
              {link.title}
            </ReactRouter.IndexLink>
          ))
        }
        <ReactRouter.IndexLink
          className="mui--hidden-xs"
          to="404"
          activeClassName="active">
          Error 404
        </ReactRouter.IndexLink>
      </Navigation>
    );
  }
};