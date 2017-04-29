export default class ContentTitleCaps extends React.Component {

	constructor(props) {
		super(props);
	};

	render() {
		return (
			<shared.ContentTitle className='caps'>
        {this.props.children}
      </shared.ContentTitle>
		);
	};
};