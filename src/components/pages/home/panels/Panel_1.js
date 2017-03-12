const app_data = require('app.data');

import '../styles/Panel_1.scss';

export default class Panel_1 extends React.Component {

  render() {
    return (
      <div id="panel-1" className="parallax-block">
        <section className="parallax-content">
          <h1 className="title caps">Panel 1 Under Construction</h1>
          <h3 className="sub-title">Panel 1 Subtitle</h3>
          <article className="content">
            <ReactRouter.Link
              className="mui-btn mui-btn--primary mui-btn--raised"
              to={app_data.nav.about}>
              Check Us Out
            </ReactRouter.Link>
          </article>
        </section>
      </div>
    );
  };
};
