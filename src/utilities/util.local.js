const util_local = {

	get: (key) => {
		return localStorage.getItem(key);
	},
	getObject: (key) => {
		const value = app_local.get(key);
		return value && JSON.parse(value);
	},
	remove: (key) => {
		localStorage.removeItem(key);
	},
	set: (key, value) => {
		localStorage.setItem(key, value);
	},
	setObject: (key, value) => {
		app_local.set(key, JSON.stringify(value));
	}
};

export default util_local;