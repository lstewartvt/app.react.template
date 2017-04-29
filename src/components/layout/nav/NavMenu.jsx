import Link from 'react-toolbox/lib/link';
import Navigation from 'react-toolbox/lib/navigation';

import menu_data from './menu.data';

import './styles/NavMenu';

export class NavMenu extends React.Component {

	handleLogout = () => {
		this.props.dispatch({
			type: 'app.auth.revoke'
		});
	};

	render() {
		return (
			<Navigation
        className='nav'
        type='horizontal'>
        {
          menu_data.nav.map((link, index) => (
            <shared.Anchor
              key={`nav-link-${index}`}
              href={app_data.nav[link.id]}>
              <abbr>{link.title}</abbr>
            </shared.Anchor>
          ))
        }
        <div className='link-group'>
          {
            !this.props.authenticated && menu_data.account.map((link, index) => (
              <shared.Anchor
                key={`account-link-${index}`}
                href={app_data.nav.account[link.id]}>
                <abbr>{link.title}</abbr>
              </shared.Anchor>
            ))
          }
        </div>
        {this.props.authenticated && (
          <shared.Anchor
            onClick={this.handleLogout}>
            <abbr>Logout</abbr>
          </shared.Anchor>
        )}
        <shared.Anchor
          href='404'>
          <abbr>Error 404</abbr>
        </shared.Anchor>
      </Navigation>
		);
	}
};

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated,
		user: state.auth.user
	};
};

export default ReactRedux.connect(mapStateToProps)(NavMenu);