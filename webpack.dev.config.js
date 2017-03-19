const build = require('./build.config.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const cssnext = require('postcss-cssnext');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  cache: true,
  context: __dirname,
  entry: {
    main: [
      'webpack-hot-middleware/client',
      'webpack/hot/dev-server',
      build.path.JSX_ENTRY_POINT
    ]
  },
  output: {
    // We need to give Webpack a path. It does not actually need it,
    // because files are kept in memory in webpack-dev-server, but an
    // error will occur if nothing is specified. We use the buildPath
    // as that points to where the files will eventually be bundled
    // in production
    path: build.path.DEST,
    filename: path.join(build.path.DEST_JS, build.path.MINIFIED_JS),

    // Everything related to Webpack should go through a build path,
    // localhost:27773/build. That makes proxying easier to handle
    publicPath: '/dist'
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    hot: true,
    noInfo: true,
    open: true,
    port: 8080
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [
        'react-hot-loader',
        'babel-loader?cacheDirectory=true'
      ]
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
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new CopyWebpackPlugin([
      // {output}/favicon.ico
      { from: 'src/favicon.ico' },

      // {output}/index.jade
      { from: 'src/index.jade' },

      // Copy directory contents to {output}/images/
      { from: 'src/images', to: 'images' }
    ]),
    new webpack.DefinePlugin({ // set production environment
      '_debug': true // custom variable to include debug code
    }),
    // new NpmInstallPlugin({
    //   dev: function(module, path) {
    //     return [
    //       "babel-preset-react-hmre",
    //       "webpack-dev-middleware",
    //       "webpack-hot-middleware",
    //     ].indexOf(module) !== -1;
    //   },
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.ProvidePlugin({
      ReactCookie: 'react-cookie',
      jQuery: 'jquery',
      React: 'react',
      ReactDOM: 'react-dom',
      ReactIntl: 'react-intl',
      ReactRouter: 'react-router'
    }), // auto load modules
    new WriteFilePlugin() // write physical files
  ],
  resolve: {
    extensions: [
      '.css',
      '.js',
      '.json',
      '.jsx',
      '.scss'
    ],
    modules: [
      // path.resolve(__dirname, './server'),
      path.resolve(__dirname, './src'),
      path.resolve(__dirname, './src/components'),
      path.resolve(__dirname, './node_modules')
    ]
  },
  // this is a default value; just be aware of it
  target: 'web'
};
