var MuiThemeProvider = require('node_modules/material-ui/styles/MuiThemeProvider').default;

var Header = require('./header/Header');
var Footer = require('./footer/Footer');
var NavSlide = require('./nav/NavSlide');

const Layout = (props) => (
  <MuiThemeProvider>
    <div id="org">
      <Header />
      <NavSlide />
      <div id="content-wrapper" className="animated body-content container fadeIn">
        {props.children}
      </div>
      <Footer />
    </div>
  </MuiThemeProvider>
);

module.exports = Layout;