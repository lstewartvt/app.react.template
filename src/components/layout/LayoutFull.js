import LayoutBase from './LayoutBase';

import './styles/LayoutFull.scss';

export default class Layout extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {
    return  (
      <LayoutBase>
        <div id='content-wrapper' className='content-full animated fadeIn'>
          {this.props.children}
        </div>
      </LayoutBase>
    );
  };
};