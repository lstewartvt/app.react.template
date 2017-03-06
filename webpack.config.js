const build = require('./build.config.js');
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
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { modules: false }],
            'react'
          ]
        }
      }],
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: webpackCombineLoaders([{
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              minimize: true,
            }
          }, {
            loader: 'postcss-loader',
          }])
        })
        // use: [
        //   { loader: 'style-loader' }, {
        //     loader: 'css-loader',
        //     options: {
        //       modules: true,
        //       localIdentName: '[name]__[local]___[hash:base64:5]',
        //       minimize: true
        //     }
        //   }, {
        //     loader: 'postcss-loader',
        //     options: {
        //       plugins: function() {
        //         return [autoprefixer({ browsers: ['> 1%', 'last 2 versions'] })]
        //       },
        //     }
        //   },
        //   { loader: `sass-loader?sourceMap?indentedSyntax=sass&includePaths[]=${path.join(__dirname, 'src/css')}` },
        // ]
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: webpackCombineLoaders([{
          loader: 'sass-loader',
          options: {
            includePaths: [path.join(__dirname, 'src/css')],
            indentedSyntax: 'scss',
            sourceMap: false
          }
        }])
      })
    }]
  },
  plugins: [
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
    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: true,
      options: {
        postcss: [
          cssnext()
        ]
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
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
