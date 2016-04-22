'use strict';

var gulp = require('gulp');


gulp.task('jshint', 'Lint JavaScript', function () {
    var jshint = require('gulp-jshint');
    var browserSync = require('browser-sync');
    var gulpIf = require('gulp-if');
    var reload = browserSync.reload;

    return gulp.src([
            'app/scripts/**/*.js',
            'app/elements/**/*.js',
            'app/elements/**/*.html'
        ])
        .pipe(reload({stream: true, once: true}))
        .pipe(jshint.extract()) // Extract JS from .html files
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(gulpIf(!browserSync.active, jshint.reporter('fail')));
});