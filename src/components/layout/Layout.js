import Header from './header/Header';
import Footer from './footer/Footer';
import NavDrawer from './nav/NavDrawer';

export default class Layout extends React.Component {

  constructor(props) {
    super(props);

    this.handleNavToggle = this.handleNavToggle.bind(this);

    this.state = {
      showNavDrawer: false
    };
  };

  handleNavToggle() {
    this.setState({
      showNavDrawer: !this.state.showNavDrawer
    });
  };

  render() {
    return  (
      <div id='root'>
        <Header handleNavToggle={this.handleNavToggle} />
        <NavDrawer
          handleNavToggle={this.handleNavToggle}
          showNavDrawer={this.state.showNavDrawer} />
        <div id='content-wrapper' className='animated body-content container fadeIn'>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  };
};