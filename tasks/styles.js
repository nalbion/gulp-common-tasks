// Compile and automatically prefix stylesheets
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var require_merge = require('./_require-merge.js');
var config = require_merge('_config.js');
var nodeSass = require('node-sass');
var path = require('path');
var fs = require('fs');
//var map = require('map-stream');
var through = require('through2');


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

gulp.task('styles:inject', function() {
   return gulp.src(config.styles.inject)
       .pipe(injectSassAsCss())
       .pipe(gulp.dest('.tmp/elements'));
});

var styleTask = function (stylesPath, srcs) {
    return gulp.src(srcs)
        .pipe($.sourcemaps.init())
        //.pipe($.changed('.tmp/styles', {extension: '.css'}))
        .pipe($.sass({
            precision: 10,
            onError: console.error.bind(console, 'Sass error:')
        }))
        .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('.tmp/' + stylesPath))
        .pipe($.if('*.css', $.csso()))
        .pipe(gulp.dest('dist/' + stylesPath))
        .pipe($.size({title: stylesPath}));
};

function injectSassAsCss() {
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
