import HeaderLogo from '../HeaderLogo';

describe('HeaderLogo', () => {

	var component;
	beforeEach(function() {
		component = ReactTests.renderIntoDocument(<HeaderLogo />);
	});

	it('renders', () => {
		expect(component).to.be.ok;
	});

	it('should display logo link', function() {

		let link = ReactTests.findRenderedDOMComponentWithTag(
		component,
		'a'
		);

		expect(link).to.be.ok;
		expect(link).to.have.id('header-logo-link');
		expect(link.textContent).to.equal('React.App');
	});
});