'use strict';

var gulp = require('gulp');
var config = require('./__config.js');

gulp.task('ng-templates', '<Angular> Processes ' + config.ngTemplates.src + ' to ' + config.paths.dest + '/js/templates.js', function () {
    var concat = require('gulp-concat'),
        replace = require('gulp-replace'),
        fileinclude = require('gulp-file-include'),
        templateCache = require('gulp-angular-templatecache');

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