import Header from './header/Header';
import Footer from './footer/Footer';
import NavSlide from './nav/NavSlide';

export default class Layout extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {
    return  (
      <div id="org">
        <Header />
        <NavSlide />
        <div id="content-wrapper" className="animated body-content container fadeIn">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  };
};