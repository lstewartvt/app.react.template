module.exports = {
  path: {
    APP: [
      'src/release/components.js'
    ],
    CSS: [
      'src/css/**/*.org.scss',
      'src/components/**/styles/**/*.scss'
    ],
    JADE: [
      'src/index.jade'
    ],
    JSX: [
      'src/components/**/*.js'
    ],
    JSX_ENTRY_POINT: 'src/components/entry.js',
    JSX_ENTRY_POINTS: [
      'src/components/entry.js'
    ],
    MINIFIED_CSS: 'app.min.css',
    MINIFIED_JS: 'app.min.js',
    MODULES: [
      './node_modules',
      './src/components'
    ],
    COMPONENTS_FILE: 'components.js',
    DEST_CSS: 'dist/css/',
    DEST_JS: 'dist/js/',
    DEST_RELEASE: 'src/release/',
    DEST_SERVER: 'server/',
    DEST: 'dist',
    SEVER_ENTRY_POINT: 'server/server.js'
  }
}
