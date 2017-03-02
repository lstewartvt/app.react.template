const gulp = require('gulp');
const babel = require('gulp-babel');
const babelify = require('babelify');
const browserify = require('browserify');
const browserSync = require('browser-sync');
const buffer = require('vinyl-buffer'); // Vinyl stream support
const build = require('./build.config.js');
const cache = require('gulp-cache');
const chalk = require('chalk'); // Allows for coloring for logging
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const del = require('del');
const duration = require('gulp-duration'); // Time aspects of your gulp process
const environments = require('gulp-environments');
const imagemin = require('gulp-imagemin');
const jade = require('gulp-jade');
const jshint = require('gulp-jshint');
const merge = require('utils-merge'); // Object merge tool
const nodemon = require('gulp-nodemon');
const notify = require('gulp-notify'); // Provides notification to both the console and Growel
const path = require('path');
const pathmodify = require('pathmodify');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const streamify = require('gulp-streamify');
const uglify = require('gulp-uglify');
const util = require('gulp-util');
const watchify = require('watchify');

// Error reporting function
function handleError(err) {
  if (err.fileName) {
    // Regular error
    util.log(`${chalk.red(err.name)}
      : ${chalk.yellow(err.fileName.replace(__dirname + '/src/js/', ''))}
      : Line ${chalk.magenta(err.lineNumber)}
       & Column ${chalk.magenta(err.columnNumber || err.column)}
      : ${chalk.blue(err.description)}`);
  } else {
    // Browserify error..
    util.log(`${chalk.red(err.name)}: ${chalk.yellow(err.message)}`);
  }
};

// Styles
gulp.task('concat-css', () => {
  return gulp.src(build.path.CSS)
    .pipe(concat('app.scss'))
    .pipe(gulp.dest(build.path.DEST_RELEASE))
    .on('error', handleError);
});

gulp.task('sass', ['concat-css'], () => {
  return gulp.src('src/release/app.scss')
    .pipe(sass())
    .pipe(gulp.dest(build.path.DEST_RELEASE))
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

gulp.task('transform-jsx', ['apply-prod-env'], function() {

  // Completes the final file outputs
  function bundle(bundler) {
    var bundleTimer = duration('Javascript bundle time');

    if (environments.production()) {
      bundler
        .bundle()
        .on('error', handleError) // Map error reporting
        .pipe(source('entry.js')) // Set source name
        .pipe(buffer()) // Convert to gulp pipeline
        .pipe(streamify(uglify())) // Minify
        .pipe(rename('app.min.js')) // Rename the output file
        .pipe(gulp.dest(build.path.DEST_JS));
    } else {
      bundler
        .bundle()
        .on('error', handleError) // Map error reporting
        .pipe(source('entry.js')) // Set source name
        .pipe(buffer()) // Convert to gulp pipeline
        .pipe(rename('app.min.js')) // Rename the output file
        .pipe(sourcemaps.init({ loadMaps: true })) // Extract the inline sourcemaps
        .pipe(sourcemaps.write('./map')) // Set folder for sourcemaps to output to
        .pipe(gulp.dest(build.path.DEST_JS))
        // .pipe(notify({
        //   message: 'Generated file: <%= file.relative %>',
        // })) // Output the file being created
        .pipe(bundleTimer); // Output time timing of the file creation
    }
  }

  var args = merge(watchify.args, {
    debug: environments.development()
  }); // Merge in default watchify args with browserify arguments

  var babelifyConfig = {
    presets: [
      'es2015',
      'react'
    ]
  };

  var pathmodifyConfig = {
    mods: [
      pathmodify.mod.dir('app_modules', __dirname + '/src/components'),
      pathmodify.mod.dir('node_modules', __dirname + '/node_modules')
    ]
  };

  var watchifyConfig = {
    ignoreWatch: [
      '**/bower_components/**',
      '**/node_modules/**',
      '**/server/**'
    ]
  };

  var bundler = browserify(build.path.JSX_ENTRY_POINT, args)
    .plugin(pathmodify, pathmodifyConfig)
    .transform(babelify, babelifyConfig) // Babel tranforms; // Browserify;

  if (environments.development()) {
    bundle(bundler = bundler.plugin(watchify, watchifyConfig)); // Watchify to watch source file changes
  } else {
    return bundle(bundler); // Run the bundle the first time (required for Watchify to kick in)
  }

  bundler.on('update', function() {
    bundle(bundler); // Re-run bundle on source updates
  });
});

gulp.task('lint-js', () => {
  return gulp.src(build.path.JSX)
    .pipe(jshint()) // JsHint
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail', { verbose: true }));
});



// Markup
gulp.task('jade', () => {
  return gulp.src(build.path.JADE)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('html', ['images', 'jade'], () => {
  return gulp.src('dist/index.html');
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
gulp.task('nodemon', (callback) => {
  var started = false;
  return nodemon({
    script: './server'
  }).on('start', () => {
    if (!started) {
      callback();
      started = true;
    }
  });
});

gulp.task('browser-sync', ['nodemon'], () => {
  browserSync.init({
    notify: {
      styles: {
        top: 'auto',
        bottom: '0'
      }
    },
    injectChanges: true
  }, {
    browser: 'chrome',
    files: ['dist/**/*.*'],
    port: 3000,
    proxy: 'localhost:27773'
  });
});



// Clean
gulp.task('clean', () => {
  return del.sync('dist');
});

// Watch
gulp.task('watch', () => {
  gulp.watch('src/**/*.scss', ['sass']);
  gulp.watch(['src/components/**/*.js'], ['transform-jsx']);
  gulp.watch('src/**/*.jade', ['html']);
});

// Copy CSS Libraries
gulp.task('css-libs', () => {
  return gulp.src('src/css/libs/**/*')
    .pipe(gulp.dest('dist/css/libs/'));
});

// Copy Sitemap
gulp.task('sitemap', () => {
  return gulp.src('src/sitemap.xml')
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy', function(callback) {
  runSequence(
    ['css-libs', 'sitemap'],
    callback);
});

// Clear Cache
gulp.task('cache:clear', function(callback) {
  return cache.clearAll(callback)
});

gulp.task('apply-dev-env', function() {
  environments.current(environments.development);
});

gulp.task('apply-prod-env', function() {
  environments.current(environments.production);
});

// Build
gulp.task('build', function(callback) {
  runSequence(
    'apply-prod-env',
    'clean', ['transform-jsx', 'copy', 'html', 'sass'],
    callback);
});

// Default
gulp.task('default', function(callback) {
  runSequence(
    'clean',
    'apply-dev-env',
    'browser-sync', ['transform-jsx', 'copy', 'html', 'sass'],
    'watch',
    callback);
});
