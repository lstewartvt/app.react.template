import '../styles/Panel_3';

import {
	ContentTitle
} from 'shared';

export default class Panel_3 extends React.Component {

	constructor(props) {
		super(props);
	};

	render() {
		return (
			<div id="panel-3" className="parallax-block long">
        <section className="parallax-content">
          <ContentTitle>{this.props.title || 'Panel 3'} Under Construction</ContentTitle>
          <article className="content"></article>
        </section>
      </div>
		);
	};
};