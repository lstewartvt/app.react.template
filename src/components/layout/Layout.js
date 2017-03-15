import Header from './header/Header';
import Footer from './footer/Footer';
import NavSlide from './nav/NavSlide';

export default class Layout extends React.Component {

  constructor(props) {
    super(props);

    this.handleNavToggle = this.handleNavToggle.bind(this);

    this.state = {
      showNavSlide: false
    };
  };

  handleNavToggle() {
    this.setState({
      showNavSlide: !this.state.showNavSlide
    });
  };

  render() {
    return  (
      <div id="org">
        <Header handleNavToggle={this.handleNavToggle} />
        <NavSlide
          handleNavToggle={this.handleNavToggle}
          showNavSlide={this.state.showNavSlide} />
        <div id="content-wrapper" className="animated body-content container fadeIn">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  };
};