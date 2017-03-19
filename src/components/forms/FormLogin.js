import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { login } from 'actions';

import {
  RESET_FORM
} from 'actions/types';

import Form from './Form';
import { FieldEmail, FieldPassword } from './fields';
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
  form: 'login', // form unique identifier
  validations
});

class FormLogin extends React.Component {

  componentWillMount() {
    this.props.dispatch({type:RESET_FORM});
  }

  handleClick(formProps) {
    this.props.login(formProps);
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <Form
        id='form-login'
        className='form-login'
        errors={this.props.errors}>
        
        <FieldEmail
          className='form-field field-email' />
        <FieldPassword
          className='form-field field-password' />

        <Button
          type='submit'
          className='form-button button-login'
          icon='person'
          label='Log in'
          onClick={handleSubmit(this.handleClick.bind(this))}
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
          icon='person_add'>
          Don't have an account? <abbr>Sign up!</abbr>
        </ButtonLink>
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

export default connect(mapStateToProps, { login })(form(FormLogin));
