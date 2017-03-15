import Link from 'react-toolbox/lib/link';
import Navigation from 'react-toolbox/lib/navigation';

import app_data from 'app.data';
import menu from './menu.data';

import './styles/NavMenu.scss';

export default class NavMenu extends React.Component {

  render() {
    return (
      <Navigation
        className="nav"
        type="horizontal">
        {
          menu.map((link, index) => (
            <ReactRouter.IndexLink
              activeClassName="active"
              className="link"
              data-react-toolbox="link"
              key={`nav-link-${index}`}
              to={app_data.nav[link.id]}>
              <abbr>{link.title}</abbr>
            </ReactRouter.IndexLink>
          ))
        }
        <ReactRouter.IndexLink
          activeClassName="active"
          className="link"
          data-react-toolbox="link"
          to="404">
          <abbr>Error 404</abbr>
        </ReactRouter.IndexLink>
      </Navigation>
    );
  }
};