const { IndexRoute, Route } = ReactRouter;

import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Donate from './pages/donate/Donate';
import NotFound from './pages/notFound/NotFound';
import Home from './pages/home/Home';
import Layout from 'layout/Layout';
import LayoutFull from 'layout/LayoutFull';
import Login from './pages/login/Login';
import Projects from './pages/projects/Projects';
import Register from './pages/register/Register';
import Team from './pages/team/Team';

module.exports = (
  <section id='routes'>
    <Route component={Layout}>
        <Route path='login' component={Login} />
        <Route path='register' component={Register} />
    </Route>
    <Route component={LayoutFull}>
        <Route path='/' component={Home} />
        <Route path='about' component={About} />
        <Route path='contact' component={Contact} />
        <Route path='donate' component={Donate} />
        <Route path='projects' component={Projects} />
        <Route path='team(/:memberId)'>
            <IndexRoute component={Team} />
            <Route path='profile' component={About} />
        </Route>
        <Route path='*' component={NotFound} />
    </Route>
  </section>
);
