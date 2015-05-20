'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];


// Compile and automatically prefix stylesheets
gulp.task('styles', function () {
    // For best performance, don't add Sass partials to `gulp.src`
    return gulp.src([
        'app/styles/**/*.scss',
        'app/styles/**/*.css',
        'app/styles/components/components.scss'
    ])
        .pipe($.sourcemaps.init())
        //.pipe($.changed('.tmp/styles', {extension: '.css'}))
        .pipe($.sass({
            precision: 10,
            onError: console.error.bind(console, 'Sass error:')
        }))
        .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('.tmp/css'))
        // Concatenate and minify styles
        .pipe($.if('*.css', $.csso()))
        .pipe(gulp.dest('dist/css'))
        .pipe($.size({title: 'styles'}));
});
