'use strict';

var gulp = require('gulp');
var inject  = require('gulp-inject');
var wiredep = require('wiredep').stream;
var path = require('path');


// Inject dist + bower lib files
gulp.task('inject', ['scripts', 'cssNano'], function(){
    // inject our dist files
    var injectSrc = gulp.src([
        './dist/app.css',
        './dist/app.js'
    ], { read: false });

    var injectOptions = {
        // ignorePath: '/public'
    };

    // inject bower deps
    var options = {
        bowerJson: require(path.resolve('bower.json')),
        // directory: './lib',
        // ignorePath: '../../public'
    };

    return gulp.src('app/*.html')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('dist'));

});