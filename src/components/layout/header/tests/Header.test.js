import {
	createStore,
	applyMiddleware
} from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from 'reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

import {
	Header
} from '../Header';

describe('Header', () => {

	let component;
	beforeEach(function() {
		component = ReactTests.renderIntoDocument(
			<ReactRedux.Provider store={store}>
	      <Header />
	    </ReactRedux.Provider>
		);
	});

	it('renders', () => {
		expect(component).to.be.ok;
	});

	it('should display logo text', function() {

		let logo = ReactTests.findRenderedDOMComponentWithTag(
			component,
			'h1'
		);

		expect(logo.textContent).to.equal('React.App');
	});

	// it('should display mobile menu icon', function() {

	//  let menuIcon = ReactTests.findRenderedDOMComponentWithClass(
	//    component,
	//    'material-icons'
	//  );

	//  expect(menuIcon).to.be.ok;
	//  expect(menuIcon.textContent).to.equal('menu');
	// });

	it('should display navigation', function() {

		let navigation = ReactTests.findRenderedDOMComponentWithTag(
			component,
			'nav'
		);
		expect(navigation).to.be.ok;
	});
});