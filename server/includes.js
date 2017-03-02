module.exports = global.includes = function(module_path) {
  return require(`${__dirname}/${module_path}`);
};
