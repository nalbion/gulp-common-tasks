'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// Copy all files at the root level (app)
gulp.task('copy', function () {
    var app = gulp.src([
        'app/*',
        '!app/*.html',
        '!app/test',
        '!app/precache.json',
        //'node_modules/apache-server-configs/dist/.htaccess'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'));

    return app.pipe($.size({title: 'copy'}));

    // Added by Polymer Starter Kit...

    //var bower = gulp.src([
    //    'bower_components/**/*'
    //]).pipe(gulp.dest('dist/bower_components'));

    //var elements = gulp.src(['app/elements/**/*.html'])
    //    .pipe(gulp.dest('dist/elements'));
    //
    //var swBootstrap = gulp.src(['bower_components/platinum-sw/bootstrap/*.js'])
    //    .pipe(gulp.dest('dist/elements/bootstrap'));
    //
    //var swToolbox = gulp.src(['bower_components/sw-toolbox/*.js'])
    //    .pipe(gulp.dest('dist/sw-toolbox'));
    //
    //var vulcanized = gulp.src(['app/elements/elements.html'])
    //    .pipe($.rename('elements.vulcanized.html'))
    //    .pipe(gulp.dest('dist/elements'));
    //
    //return merge(app, bower, elements, vulcanized, swBootstrap, swToolbox)
    //    .pipe($.size({title: 'copy'}));
});
