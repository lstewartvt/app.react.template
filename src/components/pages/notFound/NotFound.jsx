import './styles/NotFound';

export default class NotFound extends React.Component {
	render() {
		return (
			<div id='error'>
        <h1 className='mui--hidden-xs'>Missing Page</h1>
        <h2>This page was shmurda-ed bout a week agooo</h2>
        <img src='./images/shmoney.gif'/>
        <h3>
          This crime is still under investigation.
          <br/>
          Please try one of our other menu links
        </h3>
      </div>
		);
	};
};