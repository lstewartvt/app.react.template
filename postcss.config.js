module.exports = {
  plugins: {
    'postcss-import': { addDependencyTo: require('webpack') },
    'postcss-cssnext': {}
  }
};