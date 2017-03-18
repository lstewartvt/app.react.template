import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { register } from 'actions';

import Form from './Form';
import { FieldEmail, FieldPassword, FieldText } from './fields';
import { Button } from 'react-toolbox/lib/button';
import { ButtonLink } from './buttons';

const validations = values => {
  const errors = {};
  const requiredFields = [ 'email', 'password' ];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = true;
    }
  });

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

const form = reduxForm({
  form: 'register',
  validations,
});

class FormRegister extends React.Component {

  handleMouseUp(formProps) {

    console.log(formProps, this.props);
    // this.props.login(formProps);
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <Form
        id='form-register'
        className='form-register'>
        <FieldEmail
          className='form-field field-email'
          required />
        <FieldText
          name='handle'
          className='form-field field-handle'
          label='Username'
          required />
        <FieldPassword
          className='form-field field-password'
          required />

        <Button
          type='submit'
          className='form-button button-register'
          icon='person_add'
          label='Sign up'
          onClick={handleSubmit(this.handleMouseUp.bind(this))}
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
          label='Already have an account?' />
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

export default connect(mapStateToProps, { register })(form(FormRegister));