'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var require_merge = require('./_require-merge.js');

var config = require_merge('_config.js');


// Copy web fonts to dist
gulp.task('fonts', function () {
    return gulp.src(config.fonts.src)
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.size({title: 'fonts'}));
});