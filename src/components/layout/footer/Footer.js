const app_data = require('app.data');

import "./styles/Footer.scss";

export default class Footer extends React.Component {

  render() {
    return (
      <footer id="footer" className="mui--appbar-height">
        <p className="mui-container-fluid">
          &copy; {app_data.date.getFullYear()} - [ApplicationName] &trade;
        </p>
      </footer>
    );
  };
};
