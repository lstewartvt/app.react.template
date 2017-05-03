const build = require('./build.config.js'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  path = require('path'),
  webpack = require('webpack'),
  WriteFilePlugin = require('write-file-webpack-plugin');

exports.base = {
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.ProvidePlugin({
      _: 'lodash',
      app_data: 'app.data',
      jQuery: 'jquery',
      React: 'react',
      ReactDOM: 'react-dom',
      ReactIntl: 'react-intl',
      ReactRedux: 'react-redux',
      ReactRouter: 'react-router',
      ReactTests: 'react-addons-test-utils',
      Redux: 'redux',
      ReduxForm: 'redux-form',
      ReduxSaga: 'redux-saga',
      shared: 'shared',
      utils: 'utilities'
    }), // auto load modules
  ],
  resolve: {
    extensions: [
      '.css',
      '.js',
      '.json',
      '.jsx',
      '.lib.js',
      '.scss',
      '.util.js'
    ],
    modules: [
      path.resolve(__dirname, './node_modules'),
      path.resolve(__dirname, './src'),
      path.resolve(__dirname, './src/components')
    ]
  }
};

exports.build = {
  cache: true,
  context: __dirname,
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
    publicPath: '/'
  },
  // this is a default value; just be aware of it 
  target: 'web'
};

exports.plugins_base = [
  new webpack.DefinePlugin({
    'process.env': {
      'API_URL': JSON.stringify(process.env.API_URL)
    }
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.ProvidePlugin({
    _: 'lodash',
    app_data: 'app.data',
    jQuery: 'jquery',
    React: 'react',
    ReactDOM: 'react-dom',
    ReactIntl: 'react-intl',
    ReactRedux: 'react-redux',
    ReactRouter: 'react-router',
    ReactTests: 'react-addons-test-utils',
    Redux: 'redux',
    ReduxForm: 'redux-form',
    ReduxSaga: 'redux-saga',
    shared: 'shared',
    utils: 'utilities'
  })
];

exports.plugins_build = [
  new CleanWebpackPlugin(['dist'], { // remove old build directory
    root: __dirname,
    verbose: true,
    dry: false
  }),
  new CopyWebpackPlugin([
    // {output}/favicon.ico
    {
      from: 'src/favicon.ico'
    },

    // {output}/index.pug
    {
      from: 'src/index.pug'
    },

    // Copy directory contents to {output}/images/
    {
      from: 'src/images',
      to: 'images'
    }
  ]),
  new WriteFilePlugin() // write physical files
];
