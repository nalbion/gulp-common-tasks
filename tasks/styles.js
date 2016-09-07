// Compile and automatically prefix stylesheets
'use strict';

var gulp = require('gulp');
var config = require('./../tasks/__config.js');


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

gulp.task('styles', 'Processes SASS files', function () {
    return styleTask('', config.styles.src);
});

gulp.task('styles:elements', 'Processes SASS files in app/elements', function () {
    return styleTask('elements', config.styles.elements);
});

gulp.task('styles:inject', function() {
   return gulp.src(config.styles.inject)
       .pipe(injectSassAsCss())
       .pipe(gulp.dest('.tmp/elements'));
});

gulp.task('sass', function () {
    var sass = require('gulp-sass');

    return gulp.src(config.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('.tmp/css'));
});

gulp.task('concatCss', ['sass'], function () {
    var concatCss = require('gulp-concat-css');

    return gulp.src('.tmp/css/**/*.css')
        .pipe(concatCss('app.css'))
        .pipe(gulp.dest('.tmp'))
});

gulp.task('minifyCss', ['sass', 'concatCss'], function() {
    var minifyCss   = require('gulp-clean-css');
    var rename    = require('gulp-rename');

    return gulp.src('.tmp/app.css')
        .pipe(minifyCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('.tmp'));
});


var styleTask = function (stylesPath, srcs) {
    var $ = require('gulp-load-plugins')();

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

function injectSassAsCss() {
    var through = require('through2');
    var fs = require('fs');
    var path = require('path');
    var nodeSass = require('node-sass');

    //return map(function (file, cb) {
    return through.obj(function(file, enc, cb) {
        var injectString = '/* inject{scss} */';
        // convert file buffer into a string
        var contents = file.contents.toString();
        if (contents.indexOf(injectString) >= 0) {
            //Getting scss
            var scssPath = path.dirname(file.path);
            var scssFile = file.path.replace(/\.html$/i, '.scss');
            //console.info('processing and injecting', scssFile);
            fs.readFile(scssFile, function (err, data) {
                if (err || !data) {
                    return cb(null, file);
                } else {
                    nodeSass.render({
                        data: data.toString(),
                        includePaths: ['app', scssPath], //config.styles.elements,
                        outputStyle: 'compressed'
                    }, function (err, compiledScss) {  // options.context, null, payload
                        if (!err && compiledScss) {
                            //console.info(compiledScss.css.toString());
                            file.contents = new Buffer(contents.replace(injectString, compiledScss.css.toString()), 'binary');
                        } else {
                            console.error('Failed to parse SASS:', err);
                        }
                        return cb(null, file);
                    });
                }
            });
        } else {
            // continue
            return cb(null, file);
        }
    })
}

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
