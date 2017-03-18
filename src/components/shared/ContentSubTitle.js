import './styles/ContentSubTitle.scss';

export default class ContentSubTitle extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <h3 className='sub-title'>
        {this.props.children}
      </h3>
    );
  };
};