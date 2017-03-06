import Header from './header/Header';
// var Footer = require('./footer/Footer');
// var NavSlide = require('./nav/NavSlide');

export default class Layout extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {
    return  (
      <div id="org">
        <Header />
        {/*<NavSlide />
        <div id="content-wrapper" className="animated body-content container fadeIn">
          {props.children}
        </div>
        <Footer />*/}
      </div>
    );
  };
};