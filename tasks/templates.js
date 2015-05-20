'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    templateCache = require('gulp-angular-templatecache');

var require_merge = require('./_require-merge.js');
var config = require_merge('_config.js');

gulp.task('templates', function () {
    gulp.src(config.templates.src)
        .pipe(templateCache({
            //moduleSystem: 'RequireJS'
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(config.paths.dest + '/js'));
});