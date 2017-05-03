export default function(Layout) {
	class Protect extends React.Component {
		static contextTypes = {
			router: React.PropTypes.object
		};

		componentWillMount() {
			this.props.dispatch({
				type: 'app.auth.check'
			});
		};

		render() {

			if (this.props.busy) {
				return <shared.Spinner />;
			}

			return <Layout {...this.props} />;
		};
	};

	function mapStateToProps(state) {
		return {
			authenticated: state.auth.authenticated,
			busy: state.auth.busy
		};
	};

	return ReactRedux.connect(mapStateToProps)(Protect);
};