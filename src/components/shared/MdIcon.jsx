import FontIcon from 'react-toolbox/lib/font_icon';

window.MdIcon = (props) => {

	const classes = ['icon'];
	if (props.className) {
		classes.push(props.className);
	}
	return (
		<FontIcon
	    {...props}
	    className={classes.join(' ')}>
	  </FontIcon>
	);
};