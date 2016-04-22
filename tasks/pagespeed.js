'use strict';

var gulp = require('gulp');
var pagespeed = require('psi');
var config = require('./__config.js'),
    pkg = config.pkg;

gulp.task('pagespeed', '<test> Run PageSpeed Insights: ' + pkg.homepage, function (cb) {
    // Update the below URL to the public URL of your site
    pagespeed.output(pkg.homepage, {
        strategy: 'mobile',
        // By default we use the PageSpeed Insights free (no API key) tier.
        // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
        // key: 'YOUR_API_KEY'
    }, cb);
});
