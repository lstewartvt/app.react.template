const build = require('./build.config.js'),
	path = require('path'),
	webpack = require('webpack'),
	webpackConfigAssign = require('webpack-config-assign'),
	WebpackNotifierPlugin = require('webpack-notifier');

const base = require('./webpack.base.js').base,
	webpack_build = require('./webpack.base.js').build,
	plugins = require('./webpack.base.js').plugins_base
	.concat(require('./webpack.base.js').plugins_build);

module.exports = webpackConfigAssign(base, webpack_build, {
	entry: {
		main: [
			'webpack-hot-middleware/client',
			'webpack/hot/dev-server',
			build.path.JSX_ENTRY_POINT
		]
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
	plugins: plugins.concat([
		new webpack.DefinePlugin({
			'_debug': true, // include debug code
			'_prod': false, // product environment
			'_secure': false, // has ssl cert
			'process.env': {
				'API_URL': JSON.stringify(process.env.API_URL),
				'NODE_ENV': JSON.stringify('production') // set production environment
			}
		}),
		new webpack.HotModuleReplacementPlugin(),
		new WebpackNotifierPlugin({
			alwaysNotify: true
		})
	])
});