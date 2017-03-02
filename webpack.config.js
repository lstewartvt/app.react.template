const build = require('./build.config.js');
const environments = require('gulp-environments');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  entry: {
    entry: path.resolve(`${__dirname}/${build.path.JSX_ENTRY_POINT}`)
  },
  output: {
    filename: path.resolve(`${__dirname}/dist/js/app.min.js`)
  },
  devtool: 'source-map',
  plugins: environments.production() ? [
    new ExtractTextPlugin({
        allChunks: true,
        filename: `${__dirname}/dist/css/app.min.css`
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ] : [
    new ExtractTextPlugin({
        allChunks: true,
        filename: `${__dirname}/dist/css/app.min.css`
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new WriteFilePlugin()
  ],
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ]
  },
  module: {
    loaders: [{
      test: /\.jsx?/,
      exclude: /(node_modules|bower_components)/,
      // include: path.resolve(__dirname, 'src/components'),
      loaders: ['react-hot-loader', 'babel-loader?presets[]=react,presets[]=es2015', 'webpack-module-hot-accept']
    }
    // ,{
    //   test: /\.scss?/,
    //   loader: ExtractTextPlugin.extract('css-loader!sass-loader')
    // }
    ]
  },
  watch: true
};
