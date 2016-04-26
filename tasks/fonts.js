'use strict';

var gulp = require('gulp');
var config = require('./__config.js');

gulp.task('fonts', 'Copy web fonts to dist', function () {
    var size = require('gulp-size');
    return gulp.src(config.fonts.src)
        .pipe(gulp.dest('dist/fonts'))
        .pipe(require('gulp-size')({title: 'fonts'}));
});