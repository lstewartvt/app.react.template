const build = require('./build.config.js'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  CompressionPlugin = require('compression-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  cssnext = require('postcss-cssnext'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
  path = require('path'),
  webpack = require('webpack'),
  WriteFilePlugin = require('write-file-webpack-plugin');

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
    // localhost:27773/dist. That makes proxying easier to handle
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
    new webpack.optimize.AggressiveMergingPlugin(), // merge chunks
    new CleanWebpackPlugin(['dist'], { // remove old build directory
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }), // gzip files
    new CopyWebpackPlugin([ // copy files
      // {output}/favicon.ico
      { from: 'src/favicon.ico' },

      // {output}/file.txt
      { from: 'src/index.pug' },

      // Copy directory contents to {output}/images/
      { from: 'src/images', to: 'images' }
    ]),
    // new webpack.optimize.DedupePlugin(), // dedupe similar code
    new webpack.DefinePlugin({
      '_debug': false, // exclude debug code
      '_secure': false, // has ssl cert
      'process.env': {
        'NODE_ENV': JSON.stringify('production') // set production environment
      }
    }),
    new ExtractTextPlugin(path.join(build.path.DEST_CSS, build.path.MINIFIED_CSS)), // get physical CSS files
    new webpack.NoEmitOnErrorsPlugin(), // skip emitting phase
    new webpack.optimize.OccurrenceOrderPlugin(),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.min\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }), // minifiy CSS
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      React: 'react',
      ReactCookie: 'react-cookie',
      ReactDOM: 'react-dom',
      ReactIntl: 'react-intl',
      ReactRouter: 'react-router'
    }), // auto load modules
    new webpack.optimize.UglifyJsPlugin(), // minify JS
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
      path.resolve(__dirname, './src'),
      path.resolve(__dirname, './src/components'),
      path.resolve(__dirname, './node_modules')
    ]
  },
  // this is a default value; just be aware of it
  target: 'web'
};
