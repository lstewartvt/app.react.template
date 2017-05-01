const convert = {
	fromQueryString: function(queryString) {
		queryString = queryString || location.search.slice(1);
		if (!queryString) {
			return {};
		}

		const pairs = queryString.split('&');

		let result = {};
		pairs.forEach(function(pair) {
			pair = pair.split('=');
			result[pair[0]] = decodeURIComponent(pair[1] || '');
		});

		return JSON.parse(JSON.stringify(result));
	},
	// Converts bytes to base64 string
	toBase64: function(buffer) {

		if (!buffer) {
			return undefined;
		}

		var binary = '';
		var bytes = new Uint8Array(buffer);
		var len = bytes.byteLength;
		for (var i = 0; i < len; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		return window.btoa(binary);
	},
	// Converts base64 string to raw binary data held in a string
	toBlob: function(base64) {

		if (!base64) {
			return undefined;
		}

		var byteString;
		if (base64.split(',')[0].indexOf('base64') >= 0)
			byteString = atob(base64.split(',')[1]);
		else
			byteString = unescape(base64.split(',')[1]);

		// separate out the mime component
		var mimeString = base64.split(',')[0].split(':')[1].split(';')[0];

		// write the bytes of the string to a typed array
		var ia = new Uint8Array(byteString.length);
		for (var i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}

		return new Blob([ia], {
			type: mimeString
		});
	},
	// Converts base64 string to bytes
	toBytes: function(base64) {

		if (!base64) {
			return undefined;
		}

		var binary_string = window.atob(base64.replace('data:image/png;base64,', ''));
		var len = binary_string.length;
		var bytes = new Uint8Array(len);
		for (var i = 0; i < len; i++) {
			bytes[i] = binary_string.charCodeAt(i);
		}
		return bytes.buffer;
	},
	toQueryString: function(json) {
		return Object
			.keys(json)
			.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`)
			.join('&');
	}
};

export default convert;