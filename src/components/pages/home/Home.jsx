import {
	Panel_1,
	Panel_2,
	Panel_3
} from './panels';

import './styles/Home';

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