import './styles/Restricted';

export default class Restricted extends React.Component {

	constructor() {
		super();
		this.initialTime = Math.floor(app_data.nav.redirect.timeout / 1000);
		this.state = {
			time: this.initialTime
		};
	};

	componentDidMount() {

		const Verify = this;
		this.elapsed = setInterval(function() {

			if (!Verify.state.time) {
				clearInterval(Verify.elapsed);
				ReactRouter.browserHistory.push(app_data.nav.redirect.verify);
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
		return (
			<div id='restricted'>
        <shared.ContentTitle>403 Unauthorized access</shared.ContentTitle>
        <p>
        	You will be automatically redirected to the <shared.Anchor href={app_data.nav.redirect.restricted}>login page</shared.Anchor> in {this.state.time} seconds.
      	</p>
      </div>
		);
	};
};