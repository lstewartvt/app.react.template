import Form from './Form';
import { FieldEmail, FieldPassword } from './fields';
import { Button } from 'react-toolbox/lib/button';
import { ButtonLink } from './buttons';

export default class FormLogin extends React.Component {

  render() {
    return (
      <Form
        id='form-login'
        className='form-login'>
        <FieldEmail
          className='form-field field-email' />
        <FieldPassword
          className='form-field field-password' />
        <Button
          className='form-button button-login'
          icon='person'
          label='Log in'
          onMouseUp={undefined}
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
          label='Create new account' />
      </Form>
    );
  };
};
