const path = require('path'),
	webpack = require('webpack');

module.exports = function(config) {
	config.set({
		browsers: ['PhantomJS'], // run in PhantomJS
		files: [{
			pattern: 'tests.webpack.js',
			watched: false
		}],
		frameworks: ['jasmine-jquery', 'jasmine'],
		preprocessors: {
			'tests.webpack.js': ['webpack', 'sourcemap']
		},
		reporters: ['dots'], // report results in this format
		singleRun: true, // just run once by default
		webpack: { // kind of a copy of your webpack config
			devtool: 'inline-source-map', //just do inline source maps instead of the default
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
				new webpack.DefinePlugin({
					'_debug': true, // include debug code
					'_secure': false // has ssl cert
				}),
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
					ReactRouter: 'react-router',
					ReactTests: 'react-addons-test-utils',
					Redux: 'react-redux'
				}), // auto load modules
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
			watch: true
		},
		webpackServer: {
			noInfo: true // keep console clean when running in karma
		}
	});
};