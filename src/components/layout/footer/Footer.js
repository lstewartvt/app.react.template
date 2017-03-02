var app_data = require('app_modules/app.data');

const Footer = () => (
  <footer id="footer" className="mui--appbar-height">
    <p className="mui-container-fluid">
      &copy; {app_data.date.getFullYear()} - [ApplicationName] &trade;
    </p>
  </footer>
);

module.exports = Footer;