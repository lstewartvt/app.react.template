import FormLogin from 'forms/FormLogin';

import './styles/Login';

export default class Login extends React.Component {
	render() {
		return (
			<section
        id='login'
        className='content'>
        <shared.ContentTitle center>Welcome</shared.ContentTitle>
        <FormLogin />
      </section>
		);
	};
};