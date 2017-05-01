const log = {

	debug: () => {

		if (_debug) {
			console.log.apply(this, arguments);
		}
	}
};

export default log;