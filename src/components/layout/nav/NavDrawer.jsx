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
	<ReactRouter.IndexLink
    activeClassName='active'
    to={app_data.nav[props.link.id] || app_data.nav.account[props.link.id]}>
    {props.link.title}
  </ReactRouter.IndexLink>
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
				onClick: this.handleLogout.bind(this),
				title: 'Logout'
			})
		} else {
			this.links.push.apply(this.links, menu_data.account);
		}
	};

	handleLogout() {
		this.toggleNav();
		this.props.dispatch({
			type: 'app.auth.revoke'
		});
	};

	toggleNav() {
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
        onOverlayClick={toggleNav.bind(this)}>
        <List selectable ripple>
          <ListItem
            className='greeting-item'
            itemContent={<Greeting subject='K0NRT15' />}
            ripple={false}
            selectable={false} />
          {
            links.map(function(link, index) {
              let path = app_data.nav[link.id] || app_data.nav.account[link.id];
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
		nav_open: state.global.nav_open
	};
};

export default ReactRedux.connect(mapStateToProps)(NavDrawer);