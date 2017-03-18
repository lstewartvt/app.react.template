import ContentTitle from './ContentTitle';

export default class ContentTitleCaps extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <ContentTitle className='caps'>
        {this.props.children}
      </ContentTitle>
    );
  };
};