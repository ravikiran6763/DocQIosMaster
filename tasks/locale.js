/*===========================================================
 GULP: APP TASKS :: Script -- js hint, uglify & concat
===========================================================*/
var gulp = require('gulp'),
    gulploadPlugins = require('gulp-load-plugins');

var plugins = gulploadPlugins();
var config = require('./config');

gulp.task('locale', function() {

    console.log(config.notify.update('\n--------- Running LOCALE tasks -----------------------------------------\n'));
    return gulp.src([config.source.locale + '/*.json', config.source.locale + '/**/*.json'])
        .pipe(plugins.size())
        .pipe(gulp.dest(config.build.locale));
});
