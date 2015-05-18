'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// Scan your HTML for assets & optimize them
gulp.task('html', function () {
    var assets = $.useref.assets({searchPath: '{.tmp,app}'});

    return gulp.src('app/**/*.html')
        .pipe(assets)
        // Concatenate and minify JavaScript
        .pipe($.if('*.js', $.uglify({preserveComments: 'some'})))
        // Remove any unused CSS
        // Note: if not using the Style Guide, you can delete it from
        //       the next line to only include styles your project uses.
        .pipe($.if('*.css', $.uncss({
            html: [
                'app/index.html',
                'app/styleguide.html'
            ],
            // CSS Selectors for UnCSS to ignore
            ignore: [
                /.navdrawer-container.open/,
                /.app-bar.open/
            ]
        })))
        // Concatenate and minify styles
        // In case you are still using useref build blocks
        .pipe($.if('*.css', $.csso()))
        .pipe(assets.restore())
        .pipe($.useref())
        // Update production Style Guide paths
        .pipe($.replace('components/components.css', 'components/main.min.css'))
        // Minify any HTML
        .pipe($.if('*.html', $.minifyHtml()))
        // Output files
        .pipe(gulp.dest('dist'))
        .pipe($.size({title: 'html'}));
});