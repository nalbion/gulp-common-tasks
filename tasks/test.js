var gulp = require('gulp');
var lazypipe = require('lazypipe');
var mocha = require('gulp-mocha');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');
var wct = require('web-component-tester');
var async = require('async');
var serveWaterfall = require('serve-waterfall');


gulp.task('test', function(done) {
    runSequence('test:style', 'test:unit', done);
});
gulp.task('test:all', function(done) {
    runSequence('test', 'test:integration', done);
});

gulp.task('test:style', function() {
    return gulp.src([
        '{browser,runner,environment,tasks}/**/*.js',
        'gulpfile.js',
    ]).pipe(jshintFlow());
});

gulp.task('test:unit', function() {
    return gulp.src(['test/unit/*.js'], {read: false})
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('test:integration', function() {
    return gulp.src('test/integration/*.js', {read: false})
        .pipe(mocha({reporter: 'spec'}));
});


//wct.gulp.init(gulp, []);  // provides `gulp wtc, test:local (wct:local), test:remote (wct:sauce)`
// wct.test, wct.config, wct.steps, wtc.test
gulp.task('test:elements', ['typescript:unit-test'], function(done) {
    //async.series([]);

    // runs steps.setupOverrides, loadPlugins, configure, prepare, runTests
    wct.test({
        //verbose: true,
        //expanded: true,
        persistent:  true,
        suites:      ['test/elements'],
//        extraScripts: ['../polymer-ts/polymer-ts.js'],
        //breaks socketio? extraScripts: ['../requirejs/require.js'],
        //clientOptions: {
        //    // Also see `webserver.pathMappings` below.
        //    root: '/components/',
        //},
        registerHooks: function(wct) {
          wct.hook('prepare:webserver', function(app, done) {
            app.use(require('./_apiMiddleware'));
            done();
          });
        },
        //pathMappings: serveWaterfall.mappings.WEB_COMPONENT.concat([
        //    // We also expose built in WCT dependencies, but with lower priority
        //    // than the project's components.
        //    {'/components': path.join(WCT_ROOT, 'bower_components')},
        //]),
        webserver: {
            pathMappings: [
                {'/components': '../bower_components'},
                {'/components/app/test/elements': '../.tmp/wct'}
            ]
        },
        plugins: {
            local: {
                browsers: ['chrome']
            }
        }
    }, wct.cleanDone(done));
});

wct.cleanDone = function(done) {
    return function(error) {
        if (error) {
            // Pretty error for gulp.
            error = new Error(chalk.red(error.message || error));
            error.showStack = false;
        }
        done(error);
    };
};

// Flows
var jshintFlow = lazypipe()
    .pipe(jshint)
    .pipe(jshint.reporter, 'jshint-stylish')
    .pipe(jshint.reporter, 'fail');