export default class Panel_2 extends React.Component {

	constructor(props) {
		super(props);
	};

	render() {
		return (
			<div id="panel-2" className="parallax-block">
        <section className="parallax-content">
          <shared.ContentTitle>{this.props.title || 'Panel 2'} Under Construction</shared.ContentTitle>
          <article className="content"></article>
        </section>
      </div>
		);
	};
};