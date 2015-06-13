var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// Vulcanize imports
gulp.task('vulcanize', function () {
    var DEST_DIR = 'dist/elements';

    return gulp.src('dist/elements/elements.vulcanized.html')
        .pipe($.vulcanize({
            dest: DEST_DIR,
            strip: true,
            inlineCss: true,
            inlineScripts: true
        }))
        .pipe(gulp.dest(DEST_DIR))
        .pipe($.size({title: 'vulcanize'}));
});