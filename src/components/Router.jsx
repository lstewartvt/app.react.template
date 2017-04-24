import routes from './routes';

export default class Router extends React.Component {

	render() {
		return (
			<ReactIntl.IntlProvider locale='en'>
        <ReactRouter.Router history={ReactRouter.browserHistory}>
          {routes}
        </ReactRouter.Router>
      </ReactIntl.IntlProvider>
		);
	};
};