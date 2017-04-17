import {
	register
} from 'actions/auth';

import {
	RESET_FORM
} from 'actions/auth/types';

import Form from './Form';
import {
	FieldEmail,
	FieldPassword,
	FieldText
} from './fields';
import {
	Button
} from 'react-toolbox/lib/button';
import {
	ButtonLink
} from './buttons';

const validations = values => {
	const errors = {};
	const requiredFields = ['email', 'password'];
	requiredFields.forEach(field => {
		if (!values[field]) {
			errors[field] = true;
		}
	});

	if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	}

	return errors;
};

const form = ReduxForm.reduxForm({
	form: 'register',
	validations,
	enableReinitialize: true // this is needed!!
});

class FormRegister extends React.Component {

	componentWillMount() {
		this.props.dispatch({
			type: RESET_FORM
		});
	}

	handleClick(formProps) {
		this.props.register(formProps);
	};

	render() {
		const {
			handleSubmit
		} = this.props;

		return (
			<Form
        id='form-register'
        className='form-register'
        errors={this.props.errors}>

        <FieldEmail
          className='form-field field-email'
          required />
        <FieldText
          name='username'
          className='form-field field-username'
          label='Username' />
        <FieldPassword
          className='form-field field-password'
          required />

        <Button
          type='submit'
          className='form-button button-register'
          icon='person_add'
          label='Sign up'
          onClick={handleSubmit(this.handleClick.bind(this))}
          primary
          raised />

        <div className='hr-text'>
          <hr/>
          <b className='or'></b>
          <hr/>
        </div>

        <ButtonLink
          className='form-button button-login'
          href='/login'
          icon='person'
          label='Already have an account ? Login!' />
      </Form>
		);
	};
};

function mapStateToProps(state) {
	return {
		errors: state.auth.errors,
		message: state.auth.message
	};
};

export default ReactRedux.connect(mapStateToProps, {
	register
})(form(FormRegister));