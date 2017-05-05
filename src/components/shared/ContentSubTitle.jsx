import './styles/ContentSubTitle';

export default class ContentSubTitle extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			className: utils.dom.element.mergeClasses('sub-title', props.className)
		};
	};

	render() {
		return (
			<h3
				{...this.props} 
				className={this.state.className}>
        {this.props.children}
      </h3>
		);
	};
};