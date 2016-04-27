'use strict';

var gulp = require('gulp');
var src = ['app/images/**/*', '!app/images/**/README.md'];
var dest = 'dist/images/';

gulp.task('images', 'Optimize ' + src + ' to ' + dest, function () {
    var size = require('gulp-size');
    var cache = require('gulp-cache');
    var imagemin = require('gulp-imagemin');

    return gulp.src(src)
        .pipe(cache(imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(dest))
        .pipe(size({title: 'images'}));
});