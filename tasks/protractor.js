var gulp = require('gulp'),
    gulpProtractorAngular = require('gulp-angular-protractor');

// Setting up the test task 
gulp.task('protractor:cucumber', function(callback) {
    gulp
        .src(['features/*.feature'])
        .pipe(gulpProtractorAngular({
            configFile: 'features/protractor.conf.js',
            args: ['--baseUrl', 'http://127.0.0.1:8000'],
            debug: true,
            autoStartStopServer: true,
        }))
        .on('error', function(e) {
            console.log(e);
        })
        .on('end', callback);
});

gulp.task('protractor:report', ['protractor:cucumber'], function() {
    gulp.src('test-reports/cucumber.json')
        .pipe(gulpProtractorCucumberHtmlReport())
        .pipe(gulp.dest('test-reports'));
});

gulp.task('protractor:html', ['protractor:report'], function() {
    var reporter = require('gulp-protractor-cucumber-html-report');
    gulp.src('test-reports/cucumber.json')
        .pipe(reporter({
            dest: 'test-reports/'
        }));
});

function gulpProtractorCucumberHtmlReport(opts) {
    var gutil = require('gulp-util'),
        through = require('through2'),
        cucumberJunit = require('cucumberjs-junitxml');

    return through.obj(function (file, enc, cb) {
        var xml = cucumberJunit(file.contents, opts);
        //console.info(xml);
        //console.info()
        file.contents = new Buffer(xml);
        file.path = gutil.replaceExtension(file.path, '.xml');
        cb(null, file);
    });
}