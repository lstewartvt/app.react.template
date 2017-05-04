const log = {

  debug: function() {
    return _debug && console.debug.apply(this, arguments);
  },
  error: function() {
    return _debug && console.error.apply(this, arguments);
  }
};

export default log;
