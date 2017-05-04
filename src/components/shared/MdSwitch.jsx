import Switch from 'react-toolbox/lib/switch';

import './styles/MdSwitch';

class MdSwitch extends React.Component {

	constructor(props) {
		super(props);

		this.classes = ['switch'];
		if (this.props.className) {
			this.classes.push(props.className);
		}
		if (this.props.checked) {
			this.classes.push('on');
		}
		this.className = this.classes.join(' ');
	};

	handleBlur(event) {

		let element = utils.dom.element.closest(event.target, 'switch');
		if (this.props.checked) {
			utils.dom.element.removeClass(element, 'on');
		} else {
			utils.dom.element.addClass(element, 'on');
		}
	};

	render() {
		return (
			<Switch
	      {...this.props}
	      className={this.className}
	      onBlur={(event) => this.handleBlur(event)} />
		);
	};
};

MdSwitch.propTypes = {
	checked: React.PropTypes.bool,
	label: React.PropTypes.string,
	onChange: React.PropTypes.func
};

export default MdSwitch;