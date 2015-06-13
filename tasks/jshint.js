'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Lint JavaScript
gulp.task('jshint', function () {
    return gulp.src([
        'app/scripts/**/*.js',
        'app/elements/**/*.js',
        'app/elements/**/*.html'
    ])
        .pipe(reload({stream: true, once: true}))
        .pipe($.jshint.extract()) // Extract JS from .html files
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});