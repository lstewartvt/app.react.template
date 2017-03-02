const HeaderLogo = () => (
    <div id="header-logo" className="navbar-header">
        <ReactRouter.IndexLink
            activeClassName="active"
            className="navbar-brand"
            to="/">
            <span>App.React</span>
        </ReactRouter.IndexLink>
    </div>
);

module.exports = HeaderLogo;
