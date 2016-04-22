var gulp = require('gulp');

var config = require('./__config.js');

gulp.task('test', ['test:style', 'test:unit']);
gulp.task('test:all', ['test', 'test:integration']);

gulp.task('test:style', 'Runs all .js files through jshint', function() {
    var lazypipe = require('lazypipe');
    var jshint = require('gulp-jshint');

    var jshintFlow = lazypipe()
        .pipe(jshint)
        .pipe(jshint.reporter, 'jshint-stylish')
        .pipe(jshint.reporter, 'fail');

    return gulp.src([
        '{components,elements,browser,runner,environment,tasks}/**/*.js',
        'gulpfile.js',
    ]).pipe(jshintFlow());
});

gulp.task('test:unit', 'Runs mocha tests in ' + config.test.unit.src, function() {
    var mocha = require('gulp-mocha');
    return gulp.src(config.test.unit.src, {read: false})
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('test:integration', 'Runs mocha tests in ' + config.test.integration.src, function() {
    var mocha = require('gulp-mocha');
    return gulp.src(config.test.integration.src, {read: false})
        .pipe(mocha({reporter: 'spec'}));
});


//wct.gulp.init(gulp, []);  // provides `gulp wtc, test:local (wct:local), test:remote (wct:sauce)`
// wct.test, wct.config, wct.steps, wtc.test
gulp.task('test:elements',
    '<Polymer> runs WCT tests in ' + config.test.wct.src,
    ['typescript:unit-test', 'typescript:wct'], function(done) {
    //async.series([]);
    var wct = require('web-component-tester');

    wct.cleanDone = function(done) {
        return function(error) {
            if (error) {
                // Pretty error for gulp.
                error = new Error(require('chalk').red(error.message || error));
                error.showStack = false;
            }
            done(error);
        };
    };

    // runs steps.setupOverrides, loadPlugins, configure, prepare, runTests
    wct.test({
        //verbose: true,
        //expanded: true,
        persistent:  true,
        suites:      config.test.wct.src,
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
        //curl 'http://localhost:2000/components/app/test/elements/job-search/job-search-api-tests.js'
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



