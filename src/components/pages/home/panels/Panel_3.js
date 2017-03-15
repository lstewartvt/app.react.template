import '../styles/Panel_3.scss';

export default class Panel_3 extends React.Component {

  constructor(props) {
    super(props);
  };
  
  render() {
    return (
      <div id="panel-3" className="parallax-block long">
        <section className="parallax-content">
          <h1 className="content-title">{this.props.title || 'Panel 3'} Under Construction</h1>
          <article className="content"></article>
        </section>
      </div>
    );
  };
};