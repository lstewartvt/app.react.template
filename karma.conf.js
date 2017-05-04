const path = require('path'),
  webpack = require('webpack'),
  webpackConfigAssign = require('webpack-config-assign');

const base = require('./webpack.base.js').base,
  plugins = require('./webpack.base.js').plugins_base;

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'], // run in PhantomJS
    files: [{
      pattern: 'tests.webpack.js',
      watched: false
    }],
    frameworks: ['chai', 'chai-as-promised', 'chai-dom', 'jasmine'],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap']
    },
    reporters: ['dots'], // report results in this format
    singleRun: true, // just run once by default
    webpack: webpackConfigAssign(base, { // kind of a copy of your webpack config
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        rules: [{
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        }, {
          test: /\.s?css$/,
          exclude: /src/,
          use: [{
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              modules: true,
              sourceMap: false
            }
          }, {
            loader: 'resolve-url-loader',
            options: {
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
              parser: 'postcss-scss',
              sourceMap: true
            }
          }]
        }, {
          test: /\.s?css$/,
          include: /src/,
          use: [{
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              localIdentName: '[local]',
              modules: true,
              sourceMap: false
            }
          }, {
            loader: 'resolve-url-loader',
            options: {
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
              parser: 'postcss-scss',
              sourceMap: true
            }
          }]
        }]
      },
      plugins: plugins.concat([
        new webpack.DefinePlugin({
          '_debug': false, // include debug code
          '_prod': true, // product environment
          '_secure': false, // has ssl cert
          'process.env': {
            'API_URL': JSON.stringify(process.env.API_URL),
            'NODE_ENV': JSON.stringify('production') // set production environment
          }
        })
      ]),
      watch: true
    }),
    webpackServer: {
      noInfo: true // keep console clean when running in karma
    }
  });
};
