import Drawer from 'react-toolbox/lib/drawer';
import TimeGreet from 'app_modules/helpers/TimeGreet';

import menu from './menu.data';

export default class NavSlide extends React.Component {

  constructor() {
    super();

    this.state = {
      active: false
    };
  }

  handleToggle() {
    this.setState({
      active: !this.state.active
    });
  }

  componentDidMount() {
    alert('slide');
  }

  render() {
    return (
      <Drawer
        active={this.state.active}
        onOverlayClick={this.handleToggle}>
        <section className="greeting">
          <h1>
            <TimeGreet subject="Lemaire" />
          </h1>
        </section>
      </Drawer>
    );
  }
};
