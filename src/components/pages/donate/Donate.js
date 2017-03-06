import Panel_1 from 'pages/home/panels/Panel_1';
import Panel_2 from 'pages/home/panels/Panel_2';
import Panel_3 from 'pages/home/panels/Panel_3';

export default class Donate extends React.Component {
  render() {
    return (
      <div id="donate">
        <Panel_1 />
        <Panel_2 />
        <Panel_3 />
      </div>
    );
  };
};
