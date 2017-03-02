var gulp = require('gulp');
var babel = require('gulp-babel');
// var browserify = require('browserify');
var browserSync = require('browser-sync');
var build = require('./build.config.js');
var cache = require('gulp-cache');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var del = require('del');
var environments = require('gulp-environments');
// var eslint = require('gulp-eslint');
var htmlreplace = require('gulp-html-replace');
var imagemin = require('gulp-imagemin');
var jade = require('gulp-jade');
var jshint = require('gulp-jshint');
// var ngAnnotate = require('gulp-ng-annotate');
const path = require('path');
// var pathmodify = require('pathmodify');
// var react = require('gulp-react');
// var reactify = require('reactify');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
// var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
// var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var util = require('gulp-util');
var watchify = require('watchify');
// var webpack = require('webpack');
var webpack = require('gulp-webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackSettings = require('./webpack.config.js');

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

// Styles
gulp.task('concat-css', () => {
  return gulp.src(build.path.CSS)
    .pipe(concat('app.scss'))
    .pipe(gulp.dest(build.path.DEST_CSS_RELEASE))
    .on('error', handleError);
});

gulp.task('sass', ['concat-css'], () => {
  return gulp.src('src/css/release/app.scss')
    .pipe(sass())
    .pipe(gulp.dest(build.path.DEST_CSS_RELEASE))
    .pipe(cssnano())
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest(build.path.DEST_CSS));
});



// Scripts
gulp.task('lint-jsx', function() {
  return gulp.src(build.path.JSX)
    .pipe(eslint({
      baseConfig: {
        'ecmaFeatures': {
          'jsx': true
        }
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

var bundler = webpack(webpackSettings);
gulp.task('transform-jsx', function(callback) {
  return gulp.src('src/components/entry.jsx')
    .pipe(webpack(webpackSettings))
    .pipe(gulp.dest(build.path.DEST_JS));
  // return browserSync({
  //   server: {
  //     baseDir: path.resolve(__dirname, 'dist'),
  //     middleware: [
  //       webpackDevMiddleware(bundler, {
  //         publicPath: webpackSettings.output.publicPath,
  //         stats: { colors: true }
  //       }),
  //       webpackHotMiddleware(bundler)
  //     ]
  //   },
  //   files: [
  //     'src/**/*.css',
  //     'dist/**/*.html'
  //   ]
  // });
})

// gulp.task('transform-jsx', function() {

//   var babelifyConfig = {
//     presets: [
//       'es2015',
//       'react'
//     ]
//   };

//   var pathmodifyConfig = {
//     mods: [
//       pathmodify.mod.dir('modules', __dirname + '/src/components'),
//       pathmodify.mod.dir('node_modules', __dirname + '/node_modules')
//     ]
//   };

//   browserify({
//       entries: [build.path.JSX_ENTRY_POINTS],
//       debug: true,
//       NODE_ENV: 'development',
//       paths: build.path.MODULES
//     })
//     .plugin(pathmodify, pathmodifyConfig)
//     .transform('babelify', babelifyConfig)
//     .bundle()
//     .on('error', util.log)
//     .pipe(source(build.path.COMPONENTS))
//     .pipe(gulp.dest(build.path.DEST_JS_RELEASE));
// });

gulp.task('lint-js', () => {
  return gulp.src(build.path.JS)
    .pipe(jshint()) // JsHint
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail', { verbose: true }));
});

gulp.task('concat-js', () => {
  return gulp.src(build.path.JS)
    .pipe(jshint()) // JsHint
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail', { verbose: true }))
    .pipe(concat('script.js')) // Concat
    .pipe(babel({
      presets: ['es2015']
    })) // Babel
    // .pipe(ngAnnotate({
    //   remove: false,
    //   add: true,
    //   single_quotes: true
    // })) // AngularAnnotate
    .pipe(gulp.dest(build.path.DEST_JS_RELEASE));
});

gulp.task('concat-app-min', ['transform-jsx', 'concat-js'], () => {
  return gulp.src(build.path.APP)
    .pipe(concat('app.js')) // Concat
    .pipe(gulp.dest(build.path.DEST_JS_RELEASE))
    .pipe(streamify(uglify())) // Minify
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest(build.path.DEST_JS));
});

gulp.task('concat-app', ['transform-jsx', 'concat-js'], () => {
  return gulp.src(build.path.APP)
    .pipe(concat('app.js')) // Concat
    .pipe(gulp.dest(build.path.DEST_JS_RELEASE))
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest(build.path.DEST_JS));
});

// gulp.task('ng-remove', () => {
//   return gulp.src(build.path.JS)
//     .pipe(ngAnnotate({
//       remove: true,
//       add: false,
//       single_quotes: true
//     })) // AngularAnnotate
//     .pipe(gulp.dest(build.path.DEST_JS_RELEASE));
// });



// Markup
gulp.task('jade', () => {
  return gulp.src(build.path.JADE)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('html', ['jade'], () => {
  return gulp.src('dist/index.html')
    .pipe(gulp.dest('dist/about-us/'))
    .pipe(gulp.dest('dist/donate/'))
    .pipe(gulp.dest('dist/projects/'))
    .pipe(gulp.dest('dist/support/'))
    .pipe(gulp.dest('dist/team/'));
});



// Images
gulp.task('images', () => {
  return gulp.src('src/images/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images/'));
});



// Server
// gulp.task('browser-sync', () => {
//   browserSync.init({
//     server: {
//       baseDir: 'dist'
//     }
//   })
// });



// Clean
gulp.task('clean', () => {
  return del.sync('dist');
});

// Watch
gulp.task('watch', () => {
  gulp.watch('src/**/*.scss', ['sass']);
  gulp.watch(['src/components/**/*.jsx'], ['concat-app']);
  gulp.watch('src/**/*.jade', ['html']);
  gulp.watch('src/images/*', ['images']);
});

// gulp.task('watch-jsx', function() {

//   var aliasifyConfig = {
//     aliases: {
//       'd3': './shims/d3.js'
//     },
//     verbose: false
//   };

//   var babelifyConfig = {
//     presets: [
//       'es2015',
//       'react'
//     ]
//   };

//   var watcher = watchify(browserify({
//     entries: [build.path.JSX_ENTRY_POINT],
//     transform: [reactify],
//     debug: true,
//     cache: {},
//     packageCache: {},
//     paths: build.path.MODULES,
//     fullPaths: true
//   }));

//   return watcher.on('update', function() {
//       watcher.bundle()
//         .pipe(source(build.path.COMPONENTS))
//         .pipe(gulp.dest(build.path.DEST_JS_RELEASE))
//       console.log('Updated');
//     })
//     .bundle()
//     .pipe(source(build.path.COMPONENTS))
//     .pipe(gulp.dest(build.path.DEST_JS_RELEASE));
// });

// Copy CSS Libraries
gulp.task('css-libs', () => {
  return gulp.src('src/css/libs/**/*')
    .pipe(gulp.dest('dist/css/libs/'));
});

// Copy Angular Libraries
gulp.task('ng-libs', () => {
  return gulp.src('src/js/libs/angular/add-ons/**/*')
    .pipe(gulp.dest('dist/js/libs/angular/add-ons/'));
});

// Copy Sitemap
gulp.task('sitemap', () => {
  return gulp.src('src/sitemap.xml')
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy', function(callback) {
  runSequence(
    ['css-libs', 'ng-libs', 'sitemap'],
    callback);
});

// Clear Cache
gulp.task('cache:clear', function(callback) {
  return cache.clearAll(callback)
});

gulp.task('apply-dev-env', function() {
  environments.current('development');
});

// Build
gulp.task('build', function(callback) {
  runSequence(
    'clean', ['concat-app-min', 'copy', 'html', 'images', 'sass'],
    callback);
});

// Default
gulp.task('default', function(callback) {
  runSequence(
    'clean',
    'apply-dev-env', ['concat-app', 'copy', 'html', 'images', 'sass'],
    'watch',
    callback);
});
