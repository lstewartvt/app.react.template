const log = {

	debug: () => {
		return _debug && console.log.apply(this, arguments);
	}
};

export default log;