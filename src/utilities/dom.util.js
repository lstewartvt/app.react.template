const dom = {
	element: {
		addClass: (element, classNames) => {
			if (!element) {
				throw new Error('dom.util.element.addClass(): element undefined');
			}

			if (element.classList) {
				element.classList.add(classNames);
			} else {
				let classes = element.className.split(' ');
				if (classes.indexOf(classNames) < 0) {
					classes.push(classNames);
				}
				element.className = classes.join(' ');
			}
		},
		closest: (element, className) => {
			if (!element) {
				throw new Error('dom.util.element.closest(): element undefined');
			}

			if (element.classList) {
				while ((element = element.parentElement) && !element.classList.contains(className));
				return element;
			} else {
				return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
			}
		},
		removeClass: (element, classNames) => {
			if (!element) {
				throw new Error('dom.util.element.removeClass(): element undefined');
			}

			if (element.classList) {
				element.classList.remove(classNames);
			} else {
				let classes = element.className.split(' ');
				const idx = classes.indexOf(classNames);
				if (idx > -1) {
					classes.splice(idx, 1);
				}
				element.className = classes.join(' ');
			}
		}
	}
};

export default dom;