const build = require('./build.config.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const cssnext = require('postcss-cssnext');
const environments = require('gulp-environments');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const webpack = require('webpack');
const webpackCombineLoaders = require('webpack-combine-loaders');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  cache: false,
  devtool: 'cheap-module-source-map',
  entry: build.path.JSX_ENTRY_POINT,
  output: {
    // We need to give Webpack a path. It does not actually need it,
    // because files are kept in memory in webpack-dev-server, but an
    // error will occur if nothing is specified. We use the buildPath
    // as that points to where the files will eventually be bundled
    // in production
    path: build.path.DEST,
    filename: path.join(build.path.DEST_JS, build.path.MINIFIED_JS),

    // Everything related to Webpack should go through a build path,
    // localhost:27773/. That makes proxying easier to handle
    publicPath: '/dist'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    }, {
      test: /\.s?css$/,
      loader: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            // localIdentName: '[name]__[local]___[hash:base64:5]',
            localIdentName: '[local]',
            modules: true,
            sourceMap: true
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'sass-resources-loader',
          options: {
            // Provide path to the file with resources
            resources: path.resolve(__dirname, './src/components/styles/resources.scss')
          }
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        }]
      })
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new CopyWebpackPlugin([
      // {output}/file.txt
      { from: 'src/index.jade' },

      // Copy directory contents to {output}/images/
      { from: 'src/images', to: 'images' }
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin(path.join(build.path.DEST_CSS, build.path.MINIFIED_CSS)),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
      sourceMap: true
    }),
    new WriteFilePlugin()
  ],
  resolve: {
    extensions: [
      '.css',
      '.js',
      '.jsx',
      '.scss'
    ],
    modules: [
      path.resolve('./src/components'),
      path.resolve('./node_modules')
    ]
  },
  // this is a default value; just be aware of it
  target: 'web',
};
