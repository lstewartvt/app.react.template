const build = require('./build.config.js'),
  CompressionPlugin = require('compression-webpack-plugin'),
  cssnext = require('postcss-cssnext'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
  path = require('path'),
  webpack = require('webpack'),
  webpackConfigAssign = require('webpack-config-assign'),
  WriteFilePlugin = require('write-file-webpack-plugin');

const base = require('./webpack.base.js').base,
  webpack_build = require('./webpack.base.js').build,
  plugins = require('./webpack.base.js').plugins_base
  .concat(require('./webpack.base.js').plugins_build);

module.exports = webpackConfigAssign(base, webpack_build, {
  devtool: 'cheap-module-source-map',
  entry: build.path.JSX_ENTRY_POINT,
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
  plugins: plugins.concat([
    new webpack.optimize.AggressiveMergingPlugin(), // merge chunks
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }), // gzip files
    // new webpack.optimize.DedupePlugin(), // dedupe similar code
    new webpack.DefinePlugin({
      '_debug': false, // include debug code
      '_prod': true, // product environment
      '_secure': false, // has ssl cert
      'process.env': {
        'API_URL': JSON.stringify(process.env.API_URL),
        'NODE_ENV': JSON.stringify('production') // set production environment
      }
    }),
    new ExtractTextPlugin(path.join(build.path.DEST_CSS, build.path.MINIFIED_CSS)), // get physical CSS files
    new webpack.NoEmitOnErrorsPlugin(), // skip emitting phase
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.min\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    }), // minifiy CSS
    new webpack.optimize.UglifyJsPlugin() // minify JS
  ])
});
