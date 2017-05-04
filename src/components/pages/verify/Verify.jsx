import './styles/Verify';

class Verify extends React.Component {

	constructor() {
		super();
		this.initialTime = Math.floor(config.app.nav.redirect.timeout / 1000);
		this.state = {
			time: this.initialTime
		};
	};

	componentWillMount() {
		this.props.dispatch({
			type: 'app.auth.verify',
			endpoint: this.props.location.pathname
		});
	};

	startTimer = () => {

		const Verify = this;
		this.elapsed = setInterval(function() {

			if (!Verify.state.time) {
				clearInterval(Verify.elapsed);
				ReactRouter.browserHistory.push(config.app.nav.redirect.verify);
				return;
			}

			Verify.setState({
				time: Verify.state.time - 1
			});
		}, 1000);
	};

	componentWillUnmount() {
		if (this.elapsed !== undefined) {
			clearInterval(this.elapsed);
		}
	};

	render() {

		if (this.props.busy) {
			return <shared.Spinner />;
		}

		if (this.state.time === this.initialTime) {
			this.startTimer();
		}

		return (
			<div id='verify'>
        <shared.ContentTitle>Account successfully verified!</shared.ContentTitle>
        <p>
        	You will be automatically redirected to the <shared.Anchor href={config.app.nav.redirect.verify}>home page</shared.Anchor> in {this.state.time} seconds.
      	</p>
      </div>
		);
	};
};

function mapStateToProps(state) {
	return {
		busy: state.auth.busy
	};
};

export default ReactRedux.connect(mapStateToProps)(Verify);