// Compile and automatically prefix stylesheets
'use strict';

var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var cssNano   = require('gulp-cssnano');
var rename    = require('gulp-rename');
var $ = require('gulp-load-plugins')();
var require_merge = require('./_require-merge.js');
var config = require_merge('_config.js');

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

gulp.task('styles', function () {
    return styleTask('styles', config.styles.src);
});

gulp.task('styles:elements', function () {
    return styleTask('elements', config.styles.elements);
});

gulp.task('sass', function () {
    return gulp.src(config.styles.src)
        .pipe($.sass().on('error', $.sass.logError))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('concatCss', ['sass'], function () {
    return gulp.src('dist/css/**/*.css')
        .pipe(concatCss('app.css'))
        .pipe(gulp.dest('dist'))
});

gulp.task('cssNano', ['sass', 'concatCss'], function() {
    return gulp.src('dist/app.css')
        .pipe(cssNano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
});

var styleTask = function (stylesPath, srcs) {
    return gulp.src(srcs)
        .pipe($.sourcemaps.init())
        //.pipe($.changed('.tmp/styles', {extension: '.css'}))
        .pipe($.sass({
            precision: 10,
            //onError: console.error.bind(console, 'Sass error:')
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe($.sourcemaps.write({sourceRoot: '.'}))
        .pipe(gulp.dest('.tmp/' + stylesPath))
        .pipe($.if('*.css', $.csso()))
        .pipe(gulp.dest('dist/' + stylesPath))
        .pipe($.size({title: stylesPath}));
};
//
///** Copied from LESS */
//var lighten = function(color, amount, method) {
//    var hsl = color.toHSL();
//
//    if (typeof method !== "undefined" && method.value === "relative") {
//        hsl.l +=  hsl.l * amount.value / 100;
//    }
//    else {
//        hsl.l += amount.value / 100;
//    }
//    hsl.l = clamp(hsl.l);
//    return hsla(hsl);
//};
//
//var darken = function (color, amount, method) {
//    var hsl = color.toHSL();
//
//    if (typeof method !== "undefined" && method.value === "relative") {
//        hsl.l -=  hsl.l * amount.value / 100;
//    }
//    else {
//        hsl.l -= amount.value / 100;
//    }
//    hsl.l = clamp(hsl.l);
//    return hsla(hsl);
//};
