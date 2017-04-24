const {
	IndexRoute,
	Route
} = ReactRouter;

import Authenticate from './auth/Authenticate';

import {
	About,
	Contact,
	Donate,
	Home,
	Layout,
	LayoutFull,
	Login,
	NotFound,
	Projects,
	Register,
	Team
} from './pages';

const routes = (
	<section id='routes'>
        <Route component={Layout}>
            <Route path='login' component={Login} />
            <Route path='register' component={Register} />
        </Route>
        <Route component={Authenticate(LayoutFull)} >
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

export default routes;