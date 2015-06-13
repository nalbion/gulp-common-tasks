'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    replace = require('gulp-replace'),
    fileinclude = require('gulp-file-include'),
    templateCache = require('gulp-angular-templatecache');

var require_merge = require('./_require-merge.js');
var config = require_merge('_config.js');

gulp.task('ng-templates', function () {
    gulp.src(config.ngTemplates.src)
        .pipe(replace(/ng-link/g, 'ui-sref'))// TODO: remove when using new router
        .pipe(fileinclude({
            prefix: '@@'
            //basepath: 'app/views/partial'
        }))
        .pipe(templateCache(config.ngTemplates.options))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(config.paths.dest + '/js'));
});