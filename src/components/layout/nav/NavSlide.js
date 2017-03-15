import Drawer from 'react-toolbox/lib/drawer';
import TimeGreet from 'helpers/TimeGreet';

import menu from './menu.data';

import './styles/NavSlide.scss';

export default class NavSlide extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <Drawer
        active={this.props.showNavSlide}
        onOverlayClick={this.props.handleNavToggle}>
        <section className="greeting">
          <h1>
            <TimeGreet subject="Lemaire" />
          </h1>
        </section>
      </Drawer>
    );
  };
};
