/*===========================================================
 GULP: APP TASKS :: Script -- js hint, uglify & concat
 ===========================================================*/
var gulp = require('gulp'),
    gulpIf = require('gulp-if'),
    jshintStylish = require('jshint-stylish'),
    gulploadPlugins = require('gulp-load-plugins');

var plugins = gulploadPlugins();
var config = require('./config');



gulp.task('libs', function () {



    console.log(config.notify.update('\n--------- Running SCRIPT tasks -----------------------------------------\n'));
    return gulp.src([config.source.libs + '/*.js', config.source.libs + '/**/*.js'])
        //.pipe(plugins.jshint('.jshintrc'))
        //.pipe(plugins.jshint.reporter(jshintStylish))
        .pipe(plugins.concat('libs.js'))
        //.pipe(gulpIf(config.production, plugins.uglify()))
        .pipe(plugins.size())
        .pipe(gulp.dest(config.build.libs));
});