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
        	{
        		this.props.errors.map((error) => {
        			return <li>{error}</li>;
        		})
        	}
        </ol>
      </div>
		);
	};
};