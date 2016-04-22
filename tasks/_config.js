'use strict';
var argv = require('yargs').argv;

var config = {
    serve: {
        dependencies: ['scripts', 'styles', 'styles:elements', 'images']
    },
    watch: [
        {glob: ['app/components/**/*.html'], tasks: ['ng-templates'], reload: true},
        {glob: ['app/styles/**/*.{scss,css}'], tasks: ['styles'], reload: true},
        {glob: ['app/elements/**/*.{scss,css}'], tasks: ['styles:elements'], reload: true},
        {glob: ['app/{scripts,components,elements}/**/*.ts'], tasks: ['typescript:unit-test', 'test:unit'], reload: true},
        {glob: ['app/{scripts,components,elements}/*.js'], tasks: ['jshint'], reload: true},
        {glob: ['app/images/**/*'], reload: true}
    ],
    paths: {
        dest: argv.production ? 'dist' : '.tmp'
    },
    styles: {
        src: [
            'app/styles/**/*.sass',
            'app/styles/**/*.scss',
            'app/styles/**/*.css'
        ],
        elements: [
            'app/elements/**/*.scss',
            'app/elements/**/*.css'
        ],
        inject: [
            'app/elements/**/*.html'
        ]
    },
    typescript: {
        src: [
            'app/app*.ts',
            'app/components/**/*.ts'
        ],
        dest: '.tmp/js',
        unitTest: {
            src: ['app/{scripts,test,components,elements}/**/*-spec.ts'],
            dest: '.tmp/js',
            tsProject: {module: 'commonjs'}
        },
        wct: {
            src: [
                //'app/{scripts,test,components,elements}/**/*-spec.ts'
                'app/test/elements/**/*.ts'
            ],
            dest: '.tmp/wct',
            //tsProject: {module: 'commonjs'}
            tsProject: {out: 'typescript-wct.js'}
        }
    },
    ngTemplates: {
        src: [
            'app/app.html',
            'app/components/**/*.html'
        ],
        options: {
            //module: 'templates',
            //standalone: false,
            //moduleSystem: 'RequireJS'
        }
    }
};

module.exports = config;