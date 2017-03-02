var app_data = require('app_modules/app.data');

var hours = app_data.date.getHours();

var greeting;
if (hours < 12) {
  greeting = 'Good Morning';
} else if (hours >= 12 && hours <= 17) {
  greeting = 'Good Afternoon';
} else if (hours >= 17 && hours <= 24) {
  greeting = 'Good Evening';
}

var TimeGreet = React.createClass({
  render: function() {
    if (this.props.subject) {
      return (
        <span>
          {greeting}, <span className="name">{this.props.subject}</span>
        </span>
      );
    } else {
      return <span className="greet">{greeting}</span>;
    }
  }
});

module.exports = TimeGreet;