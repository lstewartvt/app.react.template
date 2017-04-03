import LayoutBase from './LayoutBase';

import './styles/Layout';

export default class Layout extends React.Component {

	constructor(props) {
		super(props);
	};

	render() {
		return (
			<LayoutBase>
        <div id='content-wrapper' className='animated fadeIn'>
          {this.props.children}
        </div>
      </LayoutBase>
		);
	};
};