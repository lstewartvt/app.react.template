const path = require('path');

module.exports = {
  path: {
    APP: [
      'src/release/components.js'
    ],
    CSS: [
      'src/css/**/*.org.scss'
    ],
    JADE: [
      'src/layout.jade'
    ],
    JSX: [
      'src/components/**/*.js'
    ],
    JSX_ENTRY_POINT: path.resolve(__dirname, 'src/components', 'entry.js'),
    JSX_ENTRY_POINTS: [
      path.resolve(__dirname, 'src/components', 'entry.js')
    ],
    MINIFIED_CSS: 'app.min.css',
    MINIFIED_CSS_GULP: 'app.min.gulp.css',
    MINIFIED_JS: 'app.min.js',
    MODULES: [
      './node_modules',
      './src/components'
    ],
    COMPONENTS_FILE: 'components.js',
    DEST_CSS: '/css/',
    DEST_JS: '/js/',
    DEST_RELEASE: 'src/release/',
    DEST_SERVER: 'server/',
    DEST: path.resolve(__dirname, 'dist'),
    DEST_GULP: path.resolve(__dirname, 'dist-gulp'),
    SEVER_ENTRY_POINT: 'server/server.js'
  },
  server: {
    port: 27773
  }
};