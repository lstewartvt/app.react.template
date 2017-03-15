import './styles/NotFound.scss';

export default class NotFound extends React.Component {
  render() {
    return (
      <div id="error">
        <h1 className="mui--hidden-xs">Missing Page</h1>
        <h2>Seems this page was shmurda-ed bout a week agooo</h2>
        <img src="./images/shmoney.gif"/>
        <h3>This page is still under investigation<br/>Please try one of our menu links in the top right corner</h3>
      </div>
    );
  };
};
