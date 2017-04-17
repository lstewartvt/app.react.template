import {
	NavMenu
} from '../NavMenu';

describe('NavMenu', () => {

	var component;
	beforeEach(function() {
		component = ReactTests.renderIntoDocument(<NavMenu />);
	});

	it('renders', () => {
		expect(component).to.be.ok;
	});

	it('should have seven links', function() {

		let links = ReactTests.scryRenderedDOMComponentsWithClass(
			component,
			'link'
		);

		const totalLinks = links.length;
		expect(links).to.be.ok;
		expect(totalLinks).to.equal(7);
		expect(links[0].textContent).to.equal('Home');
		expect(links[totalLinks - 1].textContent).to.equal('Error 404');
	});

	it('should have one link group', function() {

		let linkGroups = ReactTests.scryRenderedDOMComponentsWithClass(
			component,
			'link-group'
		);

		const totalLinkGroups = linkGroups.length;
		expect(linkGroups).to.be.ok;
		expect(totalLinkGroups).to.equal(1);
	});
});