import {
	Button
} from 'react-toolbox/lib/button';

import './styles/ButtonLink';

export default class ButtonLink extends React.Component {

	constructor(props) {
		super(props);

		this.classes = ['button-link'];
		if (props.className) {
			this.classes = this.classes.concat(props.className.split(' '));
		}
	};

	handleClick() {
		ReactRouter.browserHistory.push(this.props.href);
	};

	render() {
		return (
			<Button
        className={this.classes.join(' ')}
        disabled={this.props.disabled}
        accent={this.props.accent}
        icon={this.props.icon}
        label={this.props.label || this.props.children[0]}
        onClick={this.handleClick.bind(this)}>
      </Button>
		);
	};
};