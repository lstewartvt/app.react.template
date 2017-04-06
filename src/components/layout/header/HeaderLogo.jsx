import './styles/HeaderLogo';

export default class HeaderLogo extends React.Component {

	render() {
		return (
			<ReactRouter.IndexLink
        id='header-logo-link'
        activeClassName='active'
        to='/'>
        React.App
      </ReactRouter.IndexLink>
		);
	}
};