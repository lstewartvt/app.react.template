import '../styles/Panel_1';

export default class Panel_1 extends React.Component {

	constructor(props) {
		super(props);
	};

	render() {
		return (
			<div id='panel-1' className='parallax-block'>
        <section className='parallax-content'>
          <shared.ContentTitleCaps>{this.props.title || 'Panel 1'} Under Construction</shared.ContentTitleCaps>
          <shared.ContentSubTitle>{this.props.title || 'Panel 1'} Subtitle</shared.ContentSubTitle>
          <article className='content'>
            <ReactRouter.Link
              className='mui-btn mui-btn--primary mui-btn--raised'
              to={config.app.nav.about}>
              Check Us Out
            </ReactRouter.Link>
          </article>
        </section>
      </div>
		);
	};
};