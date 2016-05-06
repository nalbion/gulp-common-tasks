var gulp = require('gulp');
var config = require('./__config.js');


gulp.task('typescript:lint', 'Runs tslint against ' + config.typescript.src, function() {
    var tslint = require('gulp-tslint');

    return gulp.src(config.typescript.src)
        .pipe(tslint())
        .pipe(tslint.report('default'));
});

gulp.task('typescript:split', 
        'If `-production` is set, splits into app.js and extras.js (experimental)', 
        ['typescript'], 
        function () {
    var require_merge = require('./_require-merge.js');
    var systemjsConfig = require_merge('_systemjsConfig.js');
    var argv = require('yargs').argv;

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

gulp.task('typescript', 'To skip source maps: `gulp typescript --production`', function () {
    var argv = require('yargs').argv;

    if (argv.production) {
        gulp.start('typescript:requirejs');
    } else {
        gulp.start('typescript:dev');
    }
});

gulp.task('typescript:requirejs', 'remove comments & uglify AMD modules', ['typescript:dev'], function() {
    var requirejsOptimize = require('gulp-requirejs-optimize');
    return gulp.src([
            config.typescript.dest + '/app.js',
            config.typescript.dest + '/extras.js'
        ])
        .pipe(requirejsOptimize(require('./_requirejsOptimize')))
        .pipe(gulp.dest(config.paths.dest));
});


gulp.task('typescript:unit-test', ['typescript:elements','typescript:dev'], function() {
    var ts = require('gulp-typescript'),
        replace = require('gulp-replace');
    //concat = require('gulp-concat')

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

gulp.task('typescript:elements',
    'Compiles ' + config.typescript.elements.src + ' to ' + config.typescript.elements.dest,
    function () {
        return typescriptTask(config.typescript.elements);
    }
);

// TODO: http://blog.charto.net/typescript/Taming-Polymer-with-SystemJS-and-TypeScript-part-1/
gulp.task('typescript:wct',
    'Compiles ' + config.typescript.wct.src + ' to ' + config.typescript.wct.dest,
    function () {
        var _ = require('underscore');
        var require_merge = require('./_require-merge.js');
        var merge = require('merge2');
        var ts = require('gulp-typescript');
        var tsProject = require_merge('_tsProject.js');

        // var app = gulp.src([
        //         //'app/{scripts,elements}/**/*.ts',
        //         'app/elements/**/*.ts',
        //         '!app/routing.ts',
        //         '!**/*-test.ts', '!**/*-tests.ts', '!**/*-spec.ts'
        //     ])
        //     .pipe(ts(_.extend({}, tsProject, {out: 'typescript-wct.js'})))
        //     .pipe(gulp.dest('.tmp/wct'));

        var tests = gulp.src([
                'app/test/elements/**/*-tests.ts', 'app/test/elements/**/*-test.ts'
            ])
            .pipe(ts(_.extend({}, tsProject)))
            .pipe(gulp.dest('./app/test/elements'));

        // return merge(app, tests);
        return tests;

        //return typescriptTask(_.extend(config.typescript.wct));
    }
);

var typescriptTask = function(config) {
    var require_merge = require('./_require-merge.js');
    var tsProject = require_merge('_tsProject.js');
    var ts = require('gulp-typescript');
    var merge = require('merge2');
    var _ = require('underscore');

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



gulp.task('typescript:features',
    'Transpiles ' + config.typescript.features.src + ' to ' + config.typescript.features.dest,
    function() {
    return gulp.src(config.typescript.features.src)
        .pipe(ts({}))
        .pipe(gulp.dest(config.typescript.features.dest));
});


gulp.task('typescript:dev', 'Compiles ' + config.typescript.src + ' with sourcemaps to ' + config.typescript.dest, function () {
    var sourcemaps = require('gulp-sourcemaps');
    var addStream     = require('add-stream');
    var merge = require('merge2');
    var ts = require('gulp-typescript');
    var require_merge = require('./_require-merge.js');
    var tsProject = require_merge('_tsProject.js');
    var concat = require('gulp-concat')

    //var tsResult = gulp.src('app/**/*.ts')
    //    .pipe(ts({
    //        typescript: require('typescript'),
    //        noImplicitAny: true,
    //        out: 'output.js'
    //    }));
    //return tsResult.js.pipe(gulp.dest('.tmp'));

    var tsResult = gulp.src(config.typescript.src)
        .pipe(addStream.obj(prepareTemplates()))
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject)); //, {}, ts.reporter.longReporter()));

    return merge(
        tsResult.js
            //.pipe(ts.filter(tsProject, { referencedFrom: ['main.ts'] }))
            //.pipe(concat('main.js'))
            //.pipe(replace(/'scripts\/_/, '\'js/'))
            //.pipe(replace(/(\.\.\/)*(bower_components\/)/g, ''))
            //// 'bower-my-jobjs/my-jobs/MyJobs'
//            .pipe(replace(/'[-\w\/]*\/app\//g, '\'js/'))
            //.pipe(amdOptimize(requirejsConfig))
            .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '..' }))
            .pipe(gulp.dest(config.typescript.dest))
            .pipe(concat('main.js'))
            .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '..' }))
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

function prepareTemplates() {
    var _ = require('underscore');
    var templateCache = require('gulp-angular-templatecache');

    // we get a conflict with the < % = var % > syntax for $templateCache
    // template header, so we'll just encode values to keep yo happy
    var encodedHeader = "angular.module(&quot;&lt;%= module %&gt;&quot;&lt;%= standalone %&gt;).run([&quot;$templateCache&quot;, function($templateCache:any) {";
    return gulp.src('app/components/**/*.html')
        .pipe(templateCache('templates.ts', {
            root: "app-templates",
            module: "app.templates",
            standalone : true,
            templateHeader: _.unescape(encodedHeader)
        }));
}
