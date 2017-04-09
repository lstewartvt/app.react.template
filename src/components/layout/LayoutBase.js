import {
	Header
} from './header';
import {
	Footer
} from './footer';
import {
	NavDrawer
} from './nav';

import './styles/Layout';

const mongo_live = AppCookies.load('mongo_live');

export default class Layout extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			showNavDrawer: false
		};
	};

	handleNavToggle() {
		this.setState({
			showNavDrawer: !this.state.showNavDrawer
		});
	};

	render() {
		return (
			<div id='root'>
        <Header handleNavToggle={this.handleNavToggle.bind(this)} />
        <NavDrawer
          handleNavToggle={this.handleNavToggle.bind(this)}
          showNavDrawer={this.state.showNavDrawer} />
        {this.props.children}
        <Footer />
        {mongo_live && (
      		<p className='info mongo connected'>Mongo Connected...</p>
      	)}
        {!mongo_live && (
      		<p className='info mongo'>Mongo Disconnected...</p>
      	)}
      </div>
		);
	};
};