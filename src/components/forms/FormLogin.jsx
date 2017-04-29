import Form from './Form';
import {
	FieldEmail,
	FieldPassword
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
	form: 'login', // form unique identifier
	validations
});

class FormLogin extends React.Component {

	componentWillMount() {
		this.props.dispatch({
			type: 'app.auth.reset.form'
		});
	}

	handleClick = (formProps) => {
		this.props.dispatch({
			type: 'app.auth.request',
			form: formProps
		});
	};

	render() {

		if (this.props.busy) {
			return <shared.Spinner />;
		}

		const {
			handleSubmit
		} = this.props;

		return (
			<Form
        id='form-login'
        className='form-login'
        errors={this.props.errors}
        messages={this.props.messages}>
        
        <FieldEmail
          className='form-field field-email'
          name='username'
          label='Username (email/handle)' />
        <FieldPassword
          className='form-field field-password' />

        <Button
          type='submit'
          className='form-button button-login'
          icon='person'
          label='Log in'
          onClick={handleSubmit(this.handleClick)}
          primary
          raised />

        <div className='hr-text'>
          <hr/>
          <b className='or'></b>
          <hr/>
        </div>

        <ButtonLink
          className='form-button button-register'
          href='/register'
          icon='person_add'
          label={'Don\'t have an account? Sign up!'} />
      </Form>
		);
	};
};

function mapStateToProps(state) {
	return {
		busy: state.auth.busy,
		errors: state.auth.errors,
		messages: state.auth.messages
	};
};

export default ReactRedux.connect(mapStateToProps)(form(FormLogin));