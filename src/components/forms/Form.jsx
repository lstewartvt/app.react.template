import FormErrors from './FormErrors';

import './styles/Form';

export default class Form extends React.Component {

	constructor(props) {
		super(props);

		this.classes = ['form'];
		if (props.className) {
			this.classes = this.classes.concat(props.className.split(' '));
		}
	};

	renderErrors() {
		if (this.props.errors) {
			return (
				<FormErrors errors={this.props.errors} />
			);
		}
	};

	render() {
		return (
			<form
        id={this.props.id}
        className={this.classes.join(' ')}>

        {this.renderErrors()}
        {this.props.children}
        
      </form>
		);
	};
};