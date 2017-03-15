export default class Panel_2 extends React.Component {

  constructor(props) {
    super(props);
  };
  
  render() {
    return (
      <div id="panel-2" className="parallax-block">
        <section className="parallax-content">
          <h1 className="content-title">{this.props.title || 'Panel 2'} Under Construction</h1>
          <article className="content"></article>
        </section>
      </div>
    );
  };
};