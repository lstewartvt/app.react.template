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
            this.props.errors && this.props.errors.map((error, index) => {
                return <li key={index}>{error}</li>;
            })
          }
        </ol>
      </div>
    );
  };
};