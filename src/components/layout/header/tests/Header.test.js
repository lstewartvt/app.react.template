import Header from '../Header';

describe('Header', () => {

	let component;
	beforeEach(function() {
		component = ReactTests.renderIntoDocument(<Header />);
	});

	it('renders', () => {
		expect(component).toBeTruthy();
	});

	it('should display logo text', function() {

		let logo = ReactTests.findRenderedDOMComponentWithTag(
			component,
			'h1'
		);

		expect(logo.textContent).toEqual('React.App');
	});

	// it('should display mobile menu icon', function() {

	//  let menuIcon = ReactTests.findRenderedDOMComponentWithClass(
	//    component,
	//    'material-icons'
	//  );

	//  expect(menuIcon).toBeTruthy();
	//  expect(menuIcon.textContent).toEqual('menu');
	// });

	it('should display navigation', function() {

		let navigation = ReactTests.findRenderedDOMComponentWithTag(
			component,
			'nav'
		);
		expect(navigation).toBeTruthy();
	});
});