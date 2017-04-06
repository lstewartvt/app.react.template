import './styles/FormErrors';

export default class FormErrors extends React.Component {

	constructor(props) {
		super(props);
	};

	render() {

		return (
			<div
        id='form-errors'
        className='error-block'>
        <ol>
          <li>{this.props.errors}</li>
        </ol>
      </div>
		);
	};
};