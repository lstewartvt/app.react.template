import HeaderLogo from '../HeaderLogo';

describe('HeaderLogo', () => {

	var component;
	beforeEach(function() {
		component = ReactTests.renderIntoDocument(<HeaderLogo />);
	});

	it('renders', () => {
		expect(component).toBeTruthy();
	});

	it('should display logo link', function() {

		let link = ReactTests.findRenderedDOMComponentWithTag(
			component,
			'a'
		);

		expect(link).toBeTruthy();
		expect(link).toHaveId('header-logo-link');
		expect(link.textContent).toEqual('React.App');
	});
});