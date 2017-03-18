import FieldText from './FieldText';

export default class FieldPassword extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <FieldText
        type='password'
        name={this.props.name||'password'}
        error='Password is required.'
        hint={this.props.hint}
        icon={this.props.icon}
        label={this.props.label||'Password'}
        onChange={this.props.handleChange}
        required={this.props.required === undefined ? true : this.props.required}
        value={this.props.value} />
    );
  };
};