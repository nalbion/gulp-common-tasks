'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();


// Copy web fonts to dist
gulp.task('fonts', function () {
    return gulp.src(['app/fonts/**'])
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.size({title: 'fonts'}));
});