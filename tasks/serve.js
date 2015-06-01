'use strict';

var gulp = require('gulp');

var browserSync = require('browser-sync'),
    reload = browserSync.reload,
    require_merge = require('./_require-merge.js');

var config = require_merge('_config.js');

// Watch files for changes & reload
gulp.task('serve', ['styles'], function () {
    browserSync({
        notify: false,
        // Customize the BrowserSync console logging prefix
        logPrefix: 'WSK',
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: ['.tmp', 'bower_components', 'node_modules', 'app']
    });

    //gulp.watch(['app/**/*.html'], ['templates', reload]);
    //gulp.watch(['app/**/*.{scss,css}'], ['styles', reload]);
    //gulp.watch(['app/**/*.ts'], ['scripts', reload]);
    //gulp.watch(['app/**/*.js'], ['jshint']);
    //gulp.watch(['app/images/**/*'], [reload]);
    //var watchConfigs = config.watch;
    //for (var i = 0; i < watchConfigs.length; i++) {
    //    var watchConfig = watchConfigs[i];
    //    var tasks = watchConfig.tasks || [];
    //    if (watchConfig.reload) {
    //        tasks.push(reload);
    //    }
    //    gulp.watch(watchConfig.glob, tasks);
    //}
});


// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], function () {
    browserSync({
        notify: false,
        logPrefix: 'WSK',
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: 'dist'
    });
});