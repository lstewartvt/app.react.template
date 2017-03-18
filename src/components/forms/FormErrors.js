export default class FormErrors extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {

    return (
      <div class='mui--bg-danger mui--text-white'>
        <ol>
          <li>{this.props.errors}</li>
        </ol>
      </div>
    );
  };
};
