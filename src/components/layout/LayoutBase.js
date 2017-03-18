import Header from './header/Header';
import Footer from './footer/Footer';
import NavDrawer from './nav/NavDrawer';

import './styles/Layout';

export default class Layout extends React.Component {

  constructor(props) {
    super(props);

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
        <Header handleNavToggle={this.handleNavToggle.bind(this)} />
        <NavDrawer
          handleNavToggle={this.handleNavToggle.bind(this)}
          showNavDrawer={this.state.showNavDrawer} />
        {this.props.children}
        <Footer />
      </div>
    );
  };
};