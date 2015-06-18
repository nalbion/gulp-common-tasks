'use strict';

var gulp = require('gulp');

var browserSync = require('browser-sync'),
    reload = browserSync.reload,
    httpProxy = require('http-proxy'),
    path = require('path'),
    fs = require('fs'),
    require_merge = require('./_require-merge.js');

var config = require_merge('_config.js');


var mockProxy = httpProxy.createProxyServer({
    target: 'http://localhost:3000/mock-server/'
});


// Watch files for changes & reload
gulp.task('serve', ['styles', 'styles:elements', 'images'], function () {
    browserSync({
        notify: false,
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: {
            baseDir: [
                '.',
                '.tmp',
                'bower_components', 'node_modules',
                'app'],
            routes: {
                '/bower_components': 'bower_components'
            },
            middleware: [
                function (req, res, next) {
                    var match = req.url.match(/^(\/api\/[^\?]+)(\?.*)?/);
                    if (match) {
                        var reqPath = match[1];
                        reqPath = path.resolve('app/mock-server') + reqPath;
                        if (fs.existsSync(reqPath + '.js')) {
                            res.end(require(reqPath + '.js')(req, res));
                        } else if (fs.existsSync(reqPath)) {
                            mockProxy.web(req, res);
                        } else {
                            res.end('hacked from gulpfile');
                        }
                    } else
                        next();
                }
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
        gulp.watch(watchConfig.glob, tasks);
    }
});


// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], function () {
    browserSync({
        notify: false,
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: 'dist'
    });
});