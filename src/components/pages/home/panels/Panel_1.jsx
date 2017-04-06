const app_data = require('app.data');

import {
	ContentTitleCaps,
	ContentSubTitle
} from 'shared';

import '../styles/Panel_1';

export default class Panel_1 extends React.Component {

	constructor(props) {
		super(props);
	};

	render() {
		return (
			<div id='panel-1' className='parallax-block'>
        <section className='parallax-content'>
          <ContentTitleCaps>{this.props.title || 'Panel 1'} Under Construction</ContentTitleCaps>
          <ContentSubTitle>{this.props.title || 'Panel 1'} Subtitle</ContentSubTitle>
          <article className='content'>
            <ReactRouter.Link
              className='mui-btn mui-btn--primary mui-btn--raised'
              to={app_data.nav.about}>
              Check Us Out
            </ReactRouter.Link>
          </article>
        </section>
      </div>
		);
	};
};