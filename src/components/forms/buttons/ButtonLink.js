import { Button } from 'react-toolbox/lib/button';

export default class ButtonLink extends React.Component {

  constructor(props) {
    super(props);

    this.classes = ['form'];
    if(props.className) {
      this.classes = this.classes.concat(props.className.split(' '));
    }
  };

  handleMouseUp() {
    ReactRouter.browserHistory.push(this.props.href);
  };

  render() {
    return (
      <Button
        className={this.classes.join(' ')}
        disabled={this.props.disabled}
        accent={this.props.accent}
        icon={this.props.accent}
        label={this.props.label}
        onMouseUp={this.handleMouseUp.bind(this)}>
      </Button>
    );
  };
};