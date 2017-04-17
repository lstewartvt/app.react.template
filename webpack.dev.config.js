const build = require('./build.config.js'),
	CleanWebpackPlugin = require('clean-webpack-plugin'),
	CopyWebpackPlugin = require('copy-webpack-plugin'),
	cssnext = require('postcss-cssnext'),
	NpmInstallPlugin = require('npm-install-webpack-plugin'),
	path = require('path'),
	webpack = require('webpack'),
	WriteFilePlugin = require('write-file-webpack-plugin');

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
		// localhost:27773/dist. That makes proxying easier to handle
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
		new webpack.DefinePlugin({
			'_debug': true, // include debug code
			'_secure': false // has ssl cert
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
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.ProvidePlugin({
			_: 'lodash',
			api: 'app.api',
			app_data: 'app.data',
			app_local: 'app.local',
			AppCookies: 'react-cookie',
			jQuery: 'jquery',
			React: 'react',
			ReactDOM: 'react-dom',
			ReactIntl: 'react-intl',
			ReactRedux: 'react-redux',
			ReactRouter: 'react-router',
			Redux: 'redux',
			ReduxForm: 'redux-form'
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
			path.resolve(__dirname, './src'),
			path.resolve(__dirname, './src/components'),
			path.resolve(__dirname, './node_modules')
		]
	},
	// this is a default value; just be aware of it
	target: 'web'
};