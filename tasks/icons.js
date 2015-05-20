'use strict';

var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
//var consolidate = require('gulp-consolidate');
var require_merge = require('./_require-merge.js');

var config = require_merge('_config.js');
var fontName = 'icon';

gulp.task('icons', function() {
    gulp.src(['app/icons/svg/*.svg'])
        .pipe(iconfontCss({
            fontName: fontName,
            path: 'scss', // 'app/assets/css/templates/_icons.scss',
            targetPath: '../styles/_icons.scss',
            fontPath: '../fonts/'
        }))
        .pipe(iconfont({
            fontName: fontName
            //appendCodepoints: true
        }))
        //.on('codepoints', function(codepoints) {
        //    var options = {
        //        glyphs: codepoints,
        //        fontName: fontName,
        //        fontPath: '../fonts/', // set path to font (from your CSS file if relative)
        //        className: 'icon' // set class name in your CSS
        //    };
        //    gulp.src('templates/' + template + '.css')
        //        .pipe(consolidate('lodash', options))
        //        .pipe(rename({ basename:fontName }))
        //        .pipe(gulp.dest('dist/css/')); // set path to export your CSS
        //
        //    // if you don't need sample.html, remove next 4 lines
        //    gulp.src('templates/' + template + '.html')
        //        .pipe(consolidate('lodash', options))
        //        .pipe(rename({ basename:'sample' }))
        //        .pipe(gulp.dest('dist/')); // set path to export your sample HTML
        //})

        //.pipe(ttfFilter)
        //.pipe(spawn({
        //    cmd: '/bin/sh',
        //    args: [
        //        '-c',
        //        'cat | ttfautohint /dev/stdin /dev/stdout | cat'
        //    ]
        //}))
        //.pipe(ttfFilter.restore())

        .pipe(gulp.dest(config.paths.dest + '/fonts'));
});

//gulp.task('icons:fontawesome', function() {
//    return gulp.src('bower-components/font-awesome/fonts/**.*')
//        .pipe(gulp.dest(config.paths.dest + '/icons'));
//});