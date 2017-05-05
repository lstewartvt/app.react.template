import {
	Snackbar
} from 'react-toolbox/lib/snackbar';

import './styles/Toasters';

const ICONS = {
	error: 'not_interested',
	success: 'check',
	info: 'info_outline'
};

class Toasters extends React.Component {

	getMessages = () => {
		return (
			<section className='messages'
        onClick={this.handleToasterClick}>
        {
          this.props.toasters.map(message => (
            <p
              className={message.type}>
              <shared.MdIcon>{ICONS[message.type]}</shared.MdIcon>
              {message.text}
            </p>
          ))
        }
      </section>
		);
	};

	handleToasterClick = () => {
		this.props.dispatch({
			type: 'app.toggle.toaster'
		});
	};

	handleToasterTimeout = () => {
		this.props.dispatch({
			type: 'app.toggle.toaster'
		});
	};

	render() {
		return (
			<Snackbar
        active={this.props.toasters.length}
        className='toasters'
        label={this.getMessages()}
        timeout={config.app.timers.toaster}
        onTimeout={this.handleToasterTimeout} />
		);
	};
};

function mapStateToProps(state) {
	return {
		toasters: state.glob.toasters
	};
};

export default ReactRedux.connect(mapStateToProps)(Toasters);