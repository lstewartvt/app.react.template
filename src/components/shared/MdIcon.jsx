 import FontIcon from 'react-toolbox/lib/font_icon';

 const MdIcon = (props) => {

 	let className = ['icon'];
 	if (props.className) {
 		className.push(props.className);
 	}
 	className = className.join(' ');

 	return (
 		<FontIcon
	    {...props}
	    className={className}>
	  </FontIcon>
 	);
 };

 export default MdIcon;