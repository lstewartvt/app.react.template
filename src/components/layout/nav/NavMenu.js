import Link from 'react-toolbox/lib/link';
import Navigation from 'react-toolbox/lib/navigation';

import menu_data from './menu.data';

import './styles/NavMenu.scss';

export default class NavMenu extends React.Component {

	render() {
		return (
			<Navigation
        className='nav'
        type='horizontal'>
        {
          menu_data.nav.map((link, index) => (
            <ReactRouter.IndexLink
              key={`nav-link-${index}`}
              activeClassName='active'
              className='link'
              data-react-toolbox='link'
              to={app_data.nav[link.id]}>
              <abbr>{link.title}</abbr>
            </ReactRouter.IndexLink>
          ))
        }
        <div className='link-group'>
          {
            menu_data.account.map((link, index) => (
              <ReactRouter.IndexLink
                key={`account-link-${index}`}
                activeClassName='active'
                className='link'
                data-react-toolbox='link'
                to={app_data.nav.account[link.id]}>
                <abbr>{link.title}</abbr>
              </ReactRouter.IndexLink>
            ))
          }
        </div>
        <ReactRouter.IndexLink
          activeClassName='active'
          className='link'
          data-react-toolbox='link'
          to='404'>
          <abbr>Error 404</abbr>
        </ReactRouter.IndexLink>
      </Navigation>
		);
	}
};