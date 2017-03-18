import { ContentTitle } from 'shared';
import FormLogin from 'forms/FormLogin';

import './styles/Login.scss';

export default class Login extends React.Component {
  render() {
    return (
      <section
        id='login'
        className='content'>
        <ContentTitle>Welcome</ContentTitle>
        <FormLogin />
      </section>
    );
  };
};