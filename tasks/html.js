'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();


// Scan your HTML for assets & optimize them
gulp.task('html', function () {
    var assets = $.useref.assets({searchPath: ['.tmp', 'app', 'dist']});

    return gulp.src(['app/**/*.html', '!app/{elements,test}/**/*.html'])
        // Replace path for vulcanized assets
        .pipe($.if('*.html', $.replace('elements/elements.html', 'elements/elements.vulcanized.html')))
        //.pipe($.if('*.html', injectSassAsCss()))
        .pipe(assets)
        // Concatenate and minify JavaScript
        .pipe($.if('*.js', $.uglify({preserveComments: 'some'})))
        // Remove any unused CSS
        .pipe($.if('*.css', $.uncss({
            html: [
                'app/index.html'
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
        .pipe($.if('*.html', $.minifyHtml({
            quotes: true,
            empty: true,
            spare: true
        })))
        // Output files
        .pipe(gulp.dest('dist'))
        .pipe($.size({title: 'html'}));
});