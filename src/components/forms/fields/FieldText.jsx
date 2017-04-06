import {
	Field,
	reduxForm
} from 'redux-form'
import Input from 'react-toolbox/lib/input';

import './styles/FieldText';

const renderTextField = ({
	errorText,
	input,
	label,
	meta: {
		touched,
		error
	},
	...custom
}) => (
	<Input
    error={touched && error ? errorText:undefined}
    label={label}
    {...input}
    {...custom} />
);

export default class FieldText extends React.Component {

	constructor(props) {
		super(props);
	};

	render() {
		return (
			<Field
        className={this.props.className}
        type={this.props.type||'text'}
        name={this.props.name}
        component={renderTextField}
        disabled={this.props.disabled}
        errorText={this.props.error}
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