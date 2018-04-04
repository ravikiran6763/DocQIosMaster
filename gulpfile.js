var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var gulploadPlugins = require('gulp-load-plugins');
var requireDir = require('require-dir');
var minify = require('gulp-minify');
var uglify = require('gulp-uglify');
const image = require('gulp-image');
const htmlmin = require('gulp-minify-html');

var tasks = requireDir('./tasks');
var config = require('./tasks/config');

var plugins = gulploadPlugins();

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass', 'scripts', 'library', 'image', 'html', 'copycss']); //html

gulp.task('sass', function(done) {
  return gulp.src('./scss/ionic.app.scss')
    .pipe(sass()
      .on('error', sass.logError)
    )
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'));
});

//This task is used to copy the
gulp.task('copycss', function() {
  console.log(config.notify.update('\n--------- Copying CSS tasks to Build -----------------------------------------\n'));
  return gulp.src('./www/css/*')
  .pipe(gulp.dest(config.build.css));
});

var gulpIf = require('gulp-if'),
    jshintStylish = require('jshint-stylish');

var plugins = gulploadPlugins();
var rootPath = config.source.root;

gulp.task('scripts', function () {

    console.log(config.notify.update('\n--------- Running SCRIPT tasks -----------------------------------------\n'));
    return gulp.src([
        config.source.components + '/*.js',
        config.source.components + '/controller/*.js', config.source.components + '/controller/**/*.js',
        config.source.components + '/service/*.js', config.source.components + '/service/**/*.js'])
        //.pipe(plugins.jshint('.jshintrc'))
        //.pipe(plugins.jshint.reporter(jshintStylish))
        .pipe(plugins.concat('application.js'))
        //.pipe(gulpIf(config.production, plugins.uglify()))
        .pipe(plugins.size())
        .pipe(gulp.dest(config.build.js));
});

gulp.task('library', function () {

    console.log(config.notify.update('\n--------- Running LIBRARY tasks -----------------------------------------\n'));
    return gulp.src([config.source.lib + '/*.js',
        "www/lib/ionic/js/ionic.bundle.js",
        "www/lib/angular-resource/angular-resource.min.js",
        "www/lib/underscore/underscore-min.js",
        "www/lib/ngmap/build/scripts/ng-map.min.js",
        "www/lib/ngCordova/dist/ng-cordova.min.js",
        "www/lib/moment/min/moment.min.js",
        "www/lib/angular-moment/angular-moment.min.js",
        "www/lib/angular-slugify/dist/angular-slugify.min.js",
        "www/lib/ionic-ratings/src/ionic-ratings.js",
        "www/lib/ngstorage/ngStorage.min.js",
        "www/lib/angular-base64/angular-base64.js",
        "www/lib/angular-messages/angular-messages.js",
        "www/lib/angular-cookies/angular-cookies.min.js",
        "www/lib/ion-sound/js/ion.sound.js",
        "www/lib/ionic-close-popup/ionic-close-popup.js",
        "www/lib/resize-base64/index.js"
        ])
        .pipe(plugins.concat('library.js'))
        .pipe(plugins.size())
        .pipe(gulp.dest(config.build.lib));
});

gulp.task('image', function () {
  gulp.src(config.source.images +'/*')
    .pipe(image())
    .pipe(gulp.dest(config.build.images));
});

gulp.task('html', function() {
  return gulp.src(config.source.template+'/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true, comments: false, quotes: true, spare: true, empty: true, cdata: true}))
    .pipe(gulp.dest(config.build.template));
});

gulp.task('compress', function() {
  gulp.src('www/js/build/js/application.js')
    .pipe(minify({
        ext:{
            src:'-debug.min.js',
            min:'.js'
        },
        compress: true,
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(uglify())
    .pipe(plugins.size())
    .pipe(gulp.dest(config.build.js))
});

// GULP: HELPERS :: List all gulp plugin tasks
gulp.task('help', plugins.taskListing);

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});
gulp.task('serve:before', ["watch"]);
