import Input from 'react-toolbox/lib/input';

import './styles/FieldText.scss';

export default class FieldText extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <Input
        type={this.props.type||'text'}
        name={this.props.name}
        disabled={this.props.disabled}
        icon={this.props.icon}
        hint={this.props.hint}
        label={this.props.label}
        maxLength={this.props.maxLength}
        onChange={this.props.onChange}
        required={this.props.required}
        value={this.props.value} />
    );
  };
};