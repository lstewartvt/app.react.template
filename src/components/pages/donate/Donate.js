var Panel_1 = require('app_modules/pages/home/panels/Panel_1');
var Panel_2 = require('app_modules/pages/home/panels/Panel_2');
var Panel_3 = require('app_modules/pages/home/panels/Panel_3');

var Donate = React.createClass({
  render: function() {
    return (
      <div id="donate">
        <Panel_1 />
        <Panel_2 />
        <Panel_3 />
      </div>
    );
  }
});

module.exports = Donate;