var gulp = require('gulp');

gulp.task('vulcanize:elements2tmp', function() {
    return gulp.src('app/elements/**/*.html')
        .pipe(gulp.dest('.tmp/elements'));
});

gulp.task('vulcanize', '<Polymer> Vulcanize imports', ['vulcanize:elements2tmp'], function () {
    var config = require('./__config.js');
    var vulcanize = require('gulp-vulcanize');
    var size = require('gulp-size');
    var merge = require('merge2');
    var streams = merge({end: false});
    var DEST_DIR = 'dist/elements';
    
    function addVulcanizeSubTask(name, opts, streams) {
        streams.add(gulp.src(opts.src)
            .pipe(vulcanize({
                dest: opts.dest || DEST_DIR,
                strip: true,
                //excludes: ['.css'],
                stripExcludes: opts.stripExcludes,
                stripComments: true,
                inlineCss: true,
                inlineScripts: false
            }))
            .pipe(gulp.dest(opts.dest || DEST_DIR))
            .pipe(size({title: 'vulcanize ' + name}))
        );
    }
    
    for (var key in config.vulcanize) {
        if (key == 'src') {
            addVulcanizeSubTask('app', config.vulcanize, streams);
        } else if (key != 'dest' && key != 'stripExcludes') {
            addVulcanizeSubTask(key, config.vulcanize[key], streams);
        }
    }

    //return streams.end();
    return merge(streams);
});