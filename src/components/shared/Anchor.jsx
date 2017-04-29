import './styles/Anchor';

const Anchor = (props) => {

	let className = ['link'];
	if (props.className) {
		className.push(props.className);
	}
	className = className.join(' ');

	return (

		<ReactRouter.IndexLink
      activeClassName='active'
      to={props.href}
	    {...props}
	    className={className}
	    data-react-toolbox='link'>
      {props.children}
    </ReactRouter.IndexLink>
	);
};

Anchor.propTypes = {
	href: React.PropTypes.string
};

export default Anchor;