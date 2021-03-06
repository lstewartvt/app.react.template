import Drawer from 'react-toolbox/lib/drawer';
import TimeGreet from 'helpers/TimeGreet';

import {
	List,
	ListItem,
	ListSubHeader
} from 'react-toolbox/lib/list';

import menu_data from './menu.data';

import './styles/NavDrawer';

const Greeting = (props) => (
	<section className='greeting'>
    <h1>
      <TimeGreet subject={props.subject} />
    </h1>
  </section>
);

const ItemContent = (props) => (
	<shared.Anchor
    href={config.app.nav[props.link.id] || config.app.nav.account[props.link.id]}>
    {props.link.title}
  </shared.Anchor>
);

class NavDrawer extends React.Component {

	constructor(props, context) {
		super(props);

		this.context = {
			router: context.router
		};
	};

	componentWillMount() {

		this.links = menu_data.nav.slice();
		if (this.props.authenticated) {
			this.links.push({
				onClick: this.handleLogout,
				title: 'Logout'
			})
		} else {
			this.links.push.apply(this.links, menu_data.account);
		}
	};

	getSubject = () => {
		if (!this.props.user) {
			return config.app.auth.anon;
		}

		return this.props.user.name;
	};

	handleLogout = () => {
		this.toggleNav();
		this.props.dispatch({
			type: 'app.auth.revoke'
		});
	};

	toggleNav = () => {
		this.props.dispatch({
			type: 'app.toggle.nav'
		});
	};

	render() {

		const {
			context,
			links,
			props,
			toggleNav
		} = this;

		return (
			<Drawer
        active={props.nav_open}
        className='drawer-nav'
        onOverlayClick={toggleNav}>
        <List selectable ripple>
          <ListItem
            className='greeting-item'
            itemContent={<Greeting subject={this.getSubject()} />}
            ripple={false}
            selectable={false} />
          {
            links.map(function(link, index) {
              let path = config.app.nav[link.id] || config.app.nav.account[link.id];
              let isActive = path && context.router.isActive(path, true),
              className = isActive ? 'active' : undefined;
              return (
                <ListItem
                  key={`nav-link-${index}`}
                  className={className}
                  itemContent={<ItemContent link={link} />}
                  onClick={link.onClick || toggleNav} />
              );
            })
          }
        </List>
      </Drawer>
		);
	};
};

NavDrawer.contextTypes = {
	router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated,
		nav_open: state.glob.nav_open,
		user: state.auth.user
	};
};

export default ReactRedux.connect(mapStateToProps)(NavDrawer);