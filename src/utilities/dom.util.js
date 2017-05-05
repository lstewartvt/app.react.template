const dom = {

  scrollTo: function(element) {

    let coords = {
      x: 0,
      y: 0
    };
    if (element) {
      coords = dom.getCoords(element);
    }
    window.scrollTo(coords.x, coords.y);
  },
  scrollToTop: function() {

    dom.scrollTo();
  },
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

    getCoords: (element) => {
      element = element.getBoundingClientRect();

      const coords = {
        left: element.left + window.scrollX,
        top: element.top + window.scrollY
      };
      return {
        ...coords,
        x: coords.left,
        y: coords.top
      };
    },
    mergeClasses: (defaultClasses, otherClasses, setConditionalClasses) => {

      let classes = [defaultClasses];
      if (otherClasses) {
        classes.push(otherClasses);
      }

      if (typeof setConditionalClasses === 'function') {
        const conditionalClasses = setConditionalClasses();
        classes.push(conditionalClasses);
      }

      return classes.join(' ');
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
