import Form from './Form';
import { FieldEmail, FieldPassword, FieldText } from './fields';
import { Button } from 'react-toolbox/lib/button';
import { ButtonLink } from './buttons';

export default class FormRegister extends React.Component {

  render() {
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
          className='form-button button-register'
          icon='person_add'
          label='Sign up'
          onMouseUp={undefined}
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
