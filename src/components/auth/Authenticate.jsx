export default function(Layout) {
	class Authentication extends React.Component {
		static contextTypes = {
			router: React.PropTypes.object
		};

		componentWillMount() {
			if (!this.props.authenticated) {
				this.context.router.push(app_data.nav.account.login);
			}
		};

		componentWillUpdate(nextProps) {
			if (!nextProps.authenticated) {
				this.context.router.push(app_data.nav.account.login);
			}
		};

		render() {
			return <Layout {...this.props} />;
		};
	};

	function mapStateToProps(state) {
		return {
			authenticated: state.auth.authenticated
		};
	};

	return ReactRedux.connect(mapStateToProps)(Authentication);
};