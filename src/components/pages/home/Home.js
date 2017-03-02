var Panel_1 = require('./panels/Panel_1');
var Panel_2 = require('./panels/Panel_2');
var Panel_3 = require('./panels/Panel_3');

var Home = React.createClass({
  render: function() {
    return (
      <div id="home">
        <Panel_1 />
        <Panel_2 />
        <Panel_3 />
      </div>
    );
  }
});

module.exports = Home;
