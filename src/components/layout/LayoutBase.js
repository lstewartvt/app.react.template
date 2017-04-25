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

const mongo_live = utils.cookies.get('mongo_live');

export default class Layout extends React.Component {

	render() {
		return (
			<div id='root'>
        <Header />
        <NavDrawer />
        {this.props.children}
        <Footer />
        {_debug && mongo_live && (
      		<p className='info mongo connected'>Mongo Connected...</p>
      	)}
        {_debug && !mongo_live && (
      		<p className='info mongo'>Mongo Disconnected...</p>
      	)}
      </div>
		);
	};
};