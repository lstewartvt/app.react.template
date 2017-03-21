const webpack = require('webpack'),
  webpackDevMiddleware = require('webpack-dev-middleware'),
  webpackHotMiddleware = require('webpack-hot-middleware'),
  webpackConfig = require('./../webpack.dev.config.js'),
  webpackCompiler = webpack(webpackConfig);

module.exports = {
  // Enables webpack middleware for hot-reloads in development
  use: function use() {
    var app = this;

    app.use(webpackDevMiddleware(webpackCompiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true,
        chunks: false, // this reduces the amount of stuff I see in my terminal; configure to your needs
        'errors-only': true,
        progress: true
      }
    }));

    app.use(webpackHotMiddleware(webpackCompiler, {
      log: console.log
    }));

    return app;
  }
};
