'use strict';

var gulp = require('gulp');
var config = require('./../tasks/__config.js');


// Watch files for changes & reload
gulp.task('serve', config.serve.dependencies, function () {
    var browserSync = require('browser-sync'),
        reload = browserSync.reload,
        path = require('path'),
        fs = require('fs');

    browserSync({
        notify: false,
        https: true,
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: {
            baseDir: [
                //'.',
                '.tmp',
                'bower_components', 'node_modules',
                'app',
                'dist'
                ],
            routes: {
                '/bower_components': 'bower_components'
            },
            middleware: [
                require('./../tasks/_apiMiddleware')
            ]
        }
    });

    //gulp.watch(['app/**/*.html'], ['templates', reload]);
    //gulp.watch(['app/**/*.{scss,css}'], ['styles', reload]);
    //gulp.watch(['app/**/*.ts'], ['scripts', reload]);
    //gulp.watch(['app/**/*.js'], ['jshint']);
    //gulp.watch(['app/images/**/*'], [reload]);
    var watchConfigs = config.watch;
    for (var i = 0; i < watchConfigs.length; i++) {
        var watchConfig = watchConfigs[i];
        var tasks = watchConfig.tasks || [];
        if (watchConfig.reload) {
            tasks.push(reload);
        }
        //tasks = function(cb) { runSequence(tasks, cb); };
        gulp.watch(watchConfig.glob, tasks);
        //gulp.watch(watchConfig.glob, runSequence.bind(null, tasks));
        //gulp.watch(watchConfig.glob, function() { runSequence.apply(this, tasks); });
    }
});


// Build and serve the output from the dist build
gulp.task('serve:dist', ['build'], function () {
    var browserSync = require('browser-sync');
    browserSync({
        notify: false,
        https: true,
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: 'dist'
    });
});