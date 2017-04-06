import Drawer from 'react-toolbox/lib/drawer';
import TimeGreet from 'helpers/TimeGreet';

import {
	List,
	ListItem,
	ListSubHeader
} from 'react-toolbox/lib/list';

import app_data from 'app.data';
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
    to={app_data.nav[props.link.id]}>
    {props.link.title}
  </ReactRouter.IndexLink>
);

export default class NavDrawer extends React.Component {

	constructor(props, context) {
		super(props);

		this.context = {
			router: context.router
		};
	};

	render() {
		let context = this.context;
		let props = this.props;
		return (
			<Drawer
        active={this.props.showNavDrawer}
        className='drawer-nav'
        onOverlayClick={this.props.handleNavToggle}>
        <List selectable ripple>
          <ListItem
            className='greeting-item'
            itemContent={<Greeting subject='K0NRT15' />}
            ripple={false}
            selectable={false} />
          {
            menu_data.nav.map(function(link, index) {
              let isActive = context.router.isActive(app_data.nav[link.id], true),
              className = isActive ? 'active' : undefined;
              return (
                <ListItem
                  key={`nav-link-${index}`}
                  className={className}
                  itemContent={<ItemContent link={link} />}
                  onClick={props.handleNavToggle} />
              );
            })
          }
          {
            menu_data.account.map(function(link, index) {
              let isActive = context.router.isActive(app_data.nav.account[link.id], true),
              className = isActive ? 'active' : undefined;
              return (
                <ListItem
                  key={`nav-link-${index}`}
                  className={className}
                  itemContent={<ItemContent link={link} />}
                  onClick={props.handleNavToggle} />
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