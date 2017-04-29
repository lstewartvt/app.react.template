import FormRegister from 'forms/FormRegister';

import './styles/Register';

export default class Register extends React.Component {
	render() {
		return (
			<section
        id='register'
        className='content'>
        <shared.ContentTitle>Join Today!</shared.ContentTitle>
        <FormRegister />
      </section>
		);
	};
};