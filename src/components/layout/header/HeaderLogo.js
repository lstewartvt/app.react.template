export default class HeaderLogo extends React.Component {
  
  render() {
    return (
      <ReactRouter.IndexLink
        id="header-logo"
        activeClassName="active"
        className="navbar-brand"
        to="/">
        App.React
      </ReactRouter.IndexLink>
    );
  }
};