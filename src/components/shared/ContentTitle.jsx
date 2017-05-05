import './styles/ContentTitle';

export default class ContentTitle extends React.Component {

	constructor(props) {
		super(props);

		this.classes = ['content-title'];
		if (props.center !== undefined) {
			this.classes.push('mui--text-center');
		}

		if (props.className) {
			this.classes.push(props.className);
		}

		this.state = {
			className: this.classes.join(' ')
		};
	};

	render() {
		return (
			<h1 className={this.state.className}>
        {this.props.children}
      </h1>
		);
	};
};