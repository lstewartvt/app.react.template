import './styles/FormAlerts';

export default class FormAlerts extends React.Component {

	constructor(props) {
		super(props);
	};

	render() {

		return (
			<section className='form-alerts'>
        {this.props.errors && (
          <div className='alert alert-error'>
            <ol>
              {
                this.props.errors.map((error, index) => {
                  return (
                    <li
                      key={index}
                      dangerouslySetInnerHTML={shared.createMarkup(error)}></li>
                  );
                })
              }
            </ol>
          </div>
        )}
        {this.props.messages && (
          <div className='alert alert-info'>
            <ol>
              {
                this.props.messages.map((message, index) => {
                  return (
                    <li
                      key={index}
                      dangerouslySetInnerHTML={shared.createMarkup(message)}></li>
                  );
                })
              }
            </ol>
          </div>
        )}
      </section>
		);
	};
};