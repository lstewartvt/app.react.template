import { ContentTitle } from 'shared';
import FormRegister from 'forms/FormRegister';

import './styles/Register.scss';

export default class Register extends React.Component {
  render() {
    return (
      <section
        id='register'
        className='content'>
        <ContentTitle>Join Today!</ContentTitle>
        <FormRegister />
      </section>
    );
  };
};