const path = require('path');

module.exports = global.includes = function(module_path) {
  return require(path.join(__dirname, module_path));
};
