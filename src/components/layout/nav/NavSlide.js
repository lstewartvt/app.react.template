var menu = require('./menu.data');
var slideToggle = require('./slideToggle');
var TimeGreet = require('app_modules/helpers/TimeGreet');

var NavSlide = React.createClass({
  componentDidMount: function() {
    slideToggle();
  },
  render: function() {
    return (
      <aside
        id="nav-slide"
        className="mui--no-user-select">
        <section className="greeting">
          <h1>
            <TimeGreet subject="Lemaire" />
          </h1>
        </section>
        <section className="layout-padding">
          {
            menu.map((link, index) => {
              return (
                <md-button
                  key={`nav-link-${index}`}
                  className="menu-item md-primary"
                  data-ng-class="{active:org.nav.page.home}"
                  data-ng-click="org.view('home')">
                  <span>{link.title}</span>
                </md-button>
              );
            })
          }
        </section>
      </aside>
    );
  }
});

module.exports = NavSlide;
