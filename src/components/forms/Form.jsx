import FormAlerts from './FormAlerts';

import './styles/Form';

export default class Form extends React.Component {

	constructor(props) {
		super(props);

		this.classes = ['form'];
		if (props.className) {
			this.classes = this.classes.concat(props.className.split(' '));
		}
	};

	renderAlerts() {
		if (this.props.errors || this.props.messages) {
			return (
				<FormAlerts
					errors={this.props.errors}
        	messages={this.props.messages} />
			);
		}
	};

	render() {
		return (
			<form
        id={this.props.id}
        className={this.classes.join(' ')}>

        {this.renderAlerts()}
        {this.props.children}
        
      </form>
		);
	};
};