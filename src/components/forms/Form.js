import './styles/Form.scss';

export default class Form extends React.Component {

  constructor(props) {
    super(props);

    this.classes = ['form'];
    if(props.className) {
      this.classes = this.classes.concat(props.className.split(' '));
    }
  };

  render() {
    return (
      <form
        id={this.props.id}
        className={this.classes.join(' ')}>
        {this.props.children}
      </form>
    );
  };
};
