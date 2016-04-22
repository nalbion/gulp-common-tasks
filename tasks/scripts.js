var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var argv = require('yargs').argv,
    ts = require('gulp-typescript'),
    replace = require('gulp-replace'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    merge = require('merge2'),
    _ = require('underscore')
    require_merge = require('./_require-merge.js');


var config = require_merge('_config.js'),
    tsProject = require_merge('_tsProject.js'),
    systemjsConfig = require_merge('_systemjsConfig.js');


gulp.task('scripts', ['typescript'], function () {
    if (argv.production) {
        var Builder = require('systemjs-builder');
        var builder = new Builder(systemjsConfig);

        //builder.build('main/**/* - angular2/angular2', config.paths.dest + '/js/myModule.js');

        Promise.all([builder.trace('app - extras'), //  - angular2/angular2
            builder.trace('extras')])
            .then(function (trees) {
                return Promise.all([
                    builder.buildTree(trees[0], config.paths.dest + '/js/app.js'),
                    builder.buildTree(trees[1], config.paths.dest + '/js/extras.js')
                ]);
            });
    }
});

// skip source maps:  gulp scripts --production
gulp.task('typescript', function () {
    if (argv.production) {
        gulp.start('scripts:requirejs');
    } else {
        gulp.start('typescript:dev');
    }
});

gulp.task('scripts:requirejs', ['typescript:dev'], function() {
    return gulp.src(['.tmp/js/app.js',
        '.tmp/js/extras.js'])
        .pipe(requirejsOptimize(require('./_requirejsOptimize')))
        .pipe(gulp.dest(config.paths.dest));
});

gulp.task('typescript:unit-test', ['typescript:elements','typescript:dev'], function() {
    var tsTestProject = {
                            out: 'typescript-spec.js',
        //typescript: require('typescript'),
        //sortOutput: true,
        //declarationFiles: true,
        //noExternalResolve: true,
        //mapRoot: '../bower_components',
        target: 'ES5',
        //module: 'commonjs'
        //module: 'amd'
                        };
    //tsTestProject = tsProject;
                            // _.extend({out: 'unit/typescript.js'}, tsProject);
    var tsResult = gulp.src(config.typescript.unitTest.src)
        .pipe(ts(tsTestProject));

    return tsResult.js
        //.pipe($.concat('typescript-spec.js'))
        .pipe(replace(/\/\/\/ <reference path=".*chai.d.ts"\/>/, 'var chai = require(\'chai\');'))
        .pipe(gulp.dest('test/unit'))
});

gulp.task('typescript:elements', function () {
    return typescriptTask(config.typescript.elements);
});

gulp.task('typescript:wct', function () {
    return typescriptTask(_.extend(config.typescript.wct));
});

var typescriptTask = function(config) {
//console.info(config);
    var mergedTsProject = _.extend({}, tsProject, config.tsProject);
    //if (mergedTsProject.out) {
    //    delete mergedTsProject.module;
    //}
//console.info(mergedTsProject);
//console.info(config.src);
    var tsResult = gulp.src(config.src)
        .pipe(ts(mergedTsProject)); //, {}, ts.reporter.longReporter()));

    if (config.declarations) {
        return merge(
            tsResult.js
//                .pipe(replace(/'[-\w\/]*\/app\//g, '\'js/'))
                .pipe(gulp.dest(config.dest)),
            tsResult.dts.pipe(gulp.dest(config.declarations))
        );
    } else {
        return tsResult.js
//            .pipe(replace(/'[-\w\/]*\/app\//g, '\'js/'))
            .pipe(gulp.dest(config.dest));
    }
};


gulp.task('typescript:dev', function () {
    //var tsResult = gulp.src('app/**/*.ts')
    //    .pipe(ts({
    //        typescript: require('typescript'),
    //        noImplicitAny: true,
    //        out: 'output.js'
    //    }));
    //return tsResult.js.pipe(gulp.dest('.tmp'));

    var tsResult = gulp.src(config.typescript.src)
        //.pipe(sourcemaps.init())
        .pipe(ts(tsProject)); //, {}, ts.reporter.longReporter()));

    return merge(
        tsResult.js
            //.pipe(ts.filter(tsProject, { referencedFrom: ['main.ts'] }))
            //.pipe(concat('main.js'))
            //.pipe(replace(/'scripts\/_/, '\'js/'))
            //.pipe(replace(/(\.\.\/)*(bower_components\/)/g, ''))
            //// 'bower-my-jobjs/my-jobs/MyJobs'
            .pipe(replace(/'[-\w\/]*\/app\//g, '\'js/'))
            //.pipe(amdOptimize(requirejsConfig))
            //.pipe(concat('main.js'))
            //.pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '..' }))
            .pipe(gulp.dest(config.typescript.dest)),
        //tsResult.js
        //    .pipe(ts.filter(tsProject, { referencedFrom: ['extras.ts'] }))
        //    //.pipe(amdOptimize(requirejsConfig))
        //    //.pipe(concat('extras.js'))
        //    .pipe(sourcemaps.write())
        //    .pipe(gulp.dest('.tmp/js')),
        tsResult.dts.pipe(gulp.dest('.tmp/declarations'))
    );
});

