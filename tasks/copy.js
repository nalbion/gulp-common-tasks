'use strict';

var gulp = require('gulp');

gulp.task('copy', 'Copies un-processed files from app/ to dist/', function () {
    var size = require('gulp-size');
    var app = gulp.src([
        'app/*',
        '.tmp/*.css',
        '!app/**/*.{less,sass,scss,ts}',
        '!app/**/*_{spec,test}.{js,ts}',
        '!app/*.html',
        '!app/test',
        '!app/components',
        '!app/precache.json',
        '!app/**/README.md'
        //'node_modules/apache-server-configs/dist/.htaccess'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'));

    return app.pipe(size({title: 'copy'}));

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
