const build = require('./build.config.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const cssnext = require('postcss-cssnext');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const webpackCombineLoaders = require('webpack-combine-loaders');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  cache: false,
  context: __dirname,
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
      use: 'babel-loader'
    }, {
      test: /\.s?css$/,
      exclude: /src/,
      loader: ExtractTextPlugin.extract({
        use: [{
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
            sourceMap: false
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: false
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
            sourceMap: false
          }
        }]
      })
    }, {
      test: /\.s?css$/,
      include: /src/,
      loader: ExtractTextPlugin.extract({
        use: [{
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
            sourceMap: false
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: false
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
            sourceMap: false
          }
        }]
      })
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { // remove old build directory
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new CopyWebpackPlugin([ // copy files
      // {output}/favicon.ico
      { from: 'src/favicon.ico' },

      // {output}/file.txt
      { from: 'src/index.jade' },

      // Copy directory contents to {output}/images/
      { from: 'src/images', to: 'images' }
    ]),
    new webpack.DefinePlugin({ // set production environment
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin(path.join(build.path.DEST_CSS, build.path.MINIFIED_CSS)), // get physical CSS files
    new webpack.optimize.OccurrenceOrderPlugin(),
    new OptimizeCssAssetsPlugin({ // minifiy CSS
      assetNameRegExp: /\.min\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
    new webpack.optimize.UglifyJsPlugin({ // minify JS
      comments: false,
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
      sourceMap: false
    }),
    new WriteFilePlugin() // write physical files
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
  target: 'web'
};
