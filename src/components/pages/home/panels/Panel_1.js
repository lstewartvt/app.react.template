var app_data = require('../../../app.data');

var Panel_1 = React.createClass({
  render: function() {
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
  }
});

module.exports = Panel_1;