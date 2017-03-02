const ReactIntl = require('react-intl');

const IndexRoute = ReactRouter.IndexRoute;
const Route = ReactRouter.Route;
const Router = ReactRouter.Router;

var About = require('./pages/about/About');
var Contact = require('./pages/contact/Contact');
var Donate = require('./pages/donate/Donate');
var NotFound = require('./pages/notFound/NotFound');
var Home = require('./pages/home/Home');
var Layout = require('./layout/Layout');
var Projects = require('./pages/projects/Projects');
var Team = require('./pages/team/Team');

class Routes extends React.Component {
    render() {
        return (
            <ReactIntl.IntlProvider locale="en">
                <Router history={ReactRouter.browserHistory}>
                    <Route path="/" component={Layout}>
                        <IndexRoute component={Home} />
                        <Route path="about" component={About} />
                        <Route path="contact" component={Contact} />
                        <Route path="donate" component={Donate} />
                        <Route path="projects" component={Projects} />
                        <Route path="team(/:memberId)">
                            <IndexRoute component={Team} />
                            <Route path="profile" component={About} />
                        </Route>
                        <Route path="*" component={NotFound} />
                    </Route>
                </Router>
            </ReactIntl.IntlProvider>
        );
    }
};

module.exports = Routes;
