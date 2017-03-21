import NavMenu from '../NavMenu';

describe('NavMenu', () => {

  var component;
  beforeEach(function() {
    component = ReactTests.renderIntoDocument(<NavMenu />);
  });

  it('renders', () => {
    expect(component).toBeTruthy();
  });

  it('should have seven links', function() {

    let links = ReactTests.scryRenderedDOMComponentsWithClass(
      component,
      'link'
    );
    
    const totalLinks = links.length;
    expect(links).toBeTruthy();
    expect(totalLinks).toEqual(7);
    expect(links[0].textContent).toBe('Home');
    expect(links[totalLinks-1].textContent).toBe('Error 404');
  });

  it('should have one link group', function() {

    let linkGroups = ReactTests.scryRenderedDOMComponentsWithClass(
      component,
      'link-group'
    );
    
    const totalLinkGroups = linkGroups.length;
    expect(linkGroups).toBeTruthy();
    expect(totalLinkGroups).toEqual(1);
  });
});
