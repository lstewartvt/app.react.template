const ReactIntl = require('react-intl');

const { IndexRoute, Route, Router } = ReactRouter;

// import About from './pages/about/About';
// import Contact from './pages/contact/Contact';
// import Donate from './pages/donate/Donate';
import NotFound from './pages/notFound/NotFound';
import Home from './pages/home/Home';
import Layout from 'layout/Layout';
// import Projects from './pages/projects/Projects';
// import Team from './pages/team/Team';

export default class Routes extends React.Component {

    render() {
        return (
            <ReactIntl.IntlProvider locale="en">
                <Router history={ReactRouter.browserHistory}>
                    <Route path="/" component={Layout}>
                        <IndexRoute component={Home} />
                        {/*<Route path="about" component={About} />
                        <Route path="contact" component={Contact} />
                        <Route path="donate" component={Donate} />
                        <Route path="projects" component={Projects} />
                        <Route path="team(/:memberId)">
                            <IndexRoute component={Team} />
                            <Route path="profile" component={About} />
                        </Route>*/}
                        <Route path="*" component={NotFound} />
                    </Route>
                </Router>
            </ReactIntl.IntlProvider>
        );
    };
};
