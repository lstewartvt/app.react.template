import Panel_1 from './panels/Panel_1';
import Panel_2 from './panels/Panel_2';
import Panel_3 from './panels/Panel_3';

import './styles/Home.scss';

export default class Home extends React.Component {
  
  render() {
    return (
      <div id="home">
        <Panel_1 />
        <Panel_2 />
        <Panel_3 />
      </div>
    );
  };
};