'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// Copy all files at the root level (app)
gulp.task('copy', function () {
    return gulp.src([
        'app/*',
        '!app/*.html'
        //'node_modules/apache-server-configs/dist/.htaccess'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'))
        .pipe($.size({title: 'copy'}));
});
