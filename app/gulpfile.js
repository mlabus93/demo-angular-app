// comment #1
// comment #2

// gulp
var gulp = require('gulp');

// plugins
var gp = require('gulp-load-plugins')();
var gulpsync = gp.sync(gulp); 
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var cssImport = require('gulp-cssimport');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var less = require('gulp-less');
var path = require('path');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var env = require('gulp-env');
var exit = require('gulp-exit');
var Server = require('karma').Server;


var minifyify = require("minifyify")
var gutil = require('gulp-util');
var jsoncombine = require("gulp-jsoncombine");

//for validating JSON files
//npm install --save-dev gulp-jsonlint
var jsonlint = require('gulp-jsonlint');

// MAIN PATHS
var paths = {
  dist:     '../dist/',
  modules:  'modules/',
  styles:   'style/',
  lib:      'lib/',
  fonts:    'fonts/',
  images:   'images/',
  i18n:     'i18n/',
  test:     'test/', 
};

// VENDOR CONFIG
var vendor = {
  // vendor scripts required to start the app
  base: {
    source: require('./vendor.base.json'),
    dest: '../dist/js',
    name: 'base.js'
  },
  // vendor scripts to make the app work. Usually via lazy loading
  app: {
    source: require('./vendor.json'),
    dest: '../vendor'
  }
};

// SOURCES CONFIG 
var source = {
  scripts: [paths.modules + 'app.module.js',
            // modules
            paths.modules + '**/*.module.js',
            paths.modules + '**/*.js',
            // blocks modules
            paths.modules + 'blocks/**/*.module.js',
            paths.modules + 'blocks/**/*.js'
  ],
  markup: {
    index: ['index.html'],
    views: [paths.modules + '**/*.html',
            // blocks
            paths.modules + 'blocks/**/*.html']
  },
  styles: {
    css:    [paths.styles + 'css/*.css'],
    less:   [paths.styles + 'less/*.less'],
    watch:  [paths.styles + '**/*', '!'+paths.styles+'themes/*']
  },
  fonts: [paths.fonts + '*.*'],
  i18n: [paths.i18n + '*.json'],
  images: [paths.images + '*.*'],
  lib: [paths.lib + '*.js'],
  tests: [paths.test + '*.spec.js']
};

// BUILD TARGET CONFIG 
var build = {
  scripts: paths.dist + 'js',
  styles:  paths.dist + 'css',
  markup: {
    index: '../',
    views: paths.dist + 'views'
  },
  fonts: paths.dist + 'fonts',
  images: paths.dist + 'img',
  i18n: paths.dist + 'i18n',
  lib: paths.dist + 'lib'
};

var vendorUglifyOpts = {
  mangle: {
    except: ['$super'] // rickshaw requires this
  }
};

/********** TASKS **********/

isProduction = false;

// JS APP
gulp.task('scripts:app', function() {
    log('Building scripts...');
    // Minify and copy all JavaScript (except vendor scripts)
    return gulp.src(source.scripts)
        .pipe(gp.jsvalidate())
        .on('error', handleError)
        //.pipe( $.if( useSourceMaps, $.sourcemaps.init() ))
        .pipe(gp.concat( 'app.js' ))
        .pipe(gp.ngAnnotate())
        .on('error', handleError)
        .pipe( gp.if(isProduction, gp.uglify({preserveComments:'some'}) ))
        .on('error', handleError)
        //.pipe( $.if( useSourceMaps, $.sourcemaps.write() ))
        .pipe(gulp.dest(build.scripts));
});

// VENDOR BUILD
gulp.task('vendor', gulpsync.sync(['vendor:base', 'vendor:app']) );

// Build the base script to start the application from vendor assets
gulp.task('vendor:base', function() {
    log('Copying base vendor assets...');
    return gulp.src(vendor.base.source)
        .pipe(gp.expectFile(vendor.base.source))
        .pipe(gp.if( isProduction, gp.uglify() ))
        .pipe(gp.concat(vendor.base.name))
        .pipe(gulp.dest(vendor.base.dest))
        ;
});

// copy file from bower folder into the app vendor folder
gulp.task('vendor:app', function() {
  log('Copying vendor assets...');

  var jsFilter = gp.filter('**/*.js');
  var cssFilter = gp.filter('**/*.css');

  return gulp.src(vendor.app.source, {base: 'bower_components'})
    .pipe(gp.expectFile(vendor.app.source))
    .pipe(jsFilter)
    .pipe(gp.if( isProduction, gp.uglify( vendorUglifyOpts ) ))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe(gp.if( isProduction, gp.minifyCss() ))
    .pipe(cssFilter.restore())
    .pipe( gulp.dest(vendor.app.dest) );

});

// HTML
gulp.task('views:app', function() {
  log('Copying view files...');
  gulp.src(source.markup.views)
  .pipe(gulp.dest(build.markup.views));
});

// CSS
gulp.task('styles:css', function() {
  log('Copying css files...');
  gulp.src(source.styles.css)
  .pipe(gulp.dest(build.styles));
});

// STATIC FILES
gulp.task('static:resources', function () {
  log('Copying static files...');
  // copy fonts
  gulp.src(source.fonts)
  .pipe(gulp.dest(build.fonts));
  // copy images
  gulp.src(source.images)
  .pipe(gulp.dest(build.images));
  // copy language bundles
  gulp.src(source.i18n)
  .pipe(gulp.dest(build.i18n));

  //copy the lib folder to target
  gulp.src(source.lib)
  .pipe(gulp.dest(build.lib));
});

gulp.task('files', [
  'scripts:app',
  'views:app',
  'styles:css'
]);

gulp.task('watch', function () {
  log('Watching files...');
  gulp.watch(source.scripts,      ['scripts:app']);
  gulp.watch(source.markup.views, ['views:app']);
});

gulp.task('prod', function() {
  log('Starting dist...');
  isProduction = true;
});

gulp.task('default', gulpsync.sync([
  'static:resources',
  'vendor',
  'files',
  'watch'
]), function() {
  log('****** FINISHED & WATCHING FILES ******');
});

gulp.task('dist', gulpsync.sync([
  'prod',
  'static:resources',
  'vendor',
  'files'
]), function() {
  log('****** FINISHED DIST ******');
});

gulp.task('test:hint', function() {
  log('Checking test files...');
  return gulp.src(source.tests)
    .pipe(gp.jsvalidate())
    .on('error', handleError)
    .pipe(gp.jshint())
    .pipe(gp.jshint.reporter('default'))
    .pipe(gp.jshint.reporter('fail'));
})

gulp.task('test:run', function (done) {
    new Server({
        configFile : __dirname + '/karma.conf.js',
        singleRun : true
    }, done).start();
});

gulp.task('test', gulpsync.sync([
  'test:hint',
  'test:run'
]), function() {
  log('****** FINISHED TESTS ******');
});

// Error handler
function handleError(err) {
  log(err.toString());
  this.emit('end');
}

/***************************/

//task to validate the JSON file
gulp.task('lintJson', function () {
	gulp.src("./app/i18n/*.json")
    .pipe(gp.jsonlint())
    .pipe(gp.jsonlint.failOnError())
    .pipe(gp.jsonlint.reporter('fail'));
});

// tasks
// to skip the build issue ignored the topology module -- need to be fixed
gulp.task('lint', function () {
    gulp.src(source.scripts)
    .pipe(gp.jshint())
    .pipe(gp.jshint.reporter('default'))
    .pipe(gp.jshint.reporter('fail'));
});

gulp.task('clean', function () {
    gulp.src(paths.dist)
    .pipe(gp.clean({
            force : true
        }));
});



gulp.task('less', function () {
    return gulp.src('./app/css/bootstrap.less')
    .pipe(gp.less({
            paths : [path.join(__dirname, 'less', 'includes')]
        }))
    .pipe(gp.cssImport())
    .pipe(gp.rename('vts-style.css'))
    .pipe(gulp.dest('./app/css/'));
});

