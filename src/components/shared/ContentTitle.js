import './styles/ContentTitle.scss';

export default class ContentTitle extends React.Component {

  constructor(props) {
    super(props);

    this.classes = ['content-title'];
    if(props.className) {
      this.classes = this.classes.concat(props.className.split(' '));
    }
  };

  render() {
    return (
      <h1 className={this.classes.join(' ')}>
        {this.props.children}
      </h1>
    );
  };
};
