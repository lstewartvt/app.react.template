import FieldText from './FieldText';

export default class FieldEmail extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <FieldText
        type='email'
        name={this.props.name||'email'}
        error='Email is required.'
        hint={this.props.hint}
        icon={this.props.icon}
        label={this.props.label||'Email'}
        onChange={this.props.handleChange}
        required={this.props.required === undefined ? true : this.props.required}
        value={this.props.value} />
    );
  };
};