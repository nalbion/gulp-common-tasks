'use strict';
var argv = require('yargs').argv;

var config = {
    clean: ['.tmp', 'dist/*', '!dist/.git'],
    serve: {
        dependencies: ['scripts', 'styles', 'styles:elements', 'images']
    },
    watch: [
        {glob: ['app/components/**/*.html'], tasks: ['ng-templates'], reload: true},
        {glob: ['app/app.scss', 'app/{components,views,styles}/**/*.{scss,css}'], tasks: ['styles'], reload: true},
        {glob: ['app/elements/**/*.{scss,css}'], tasks: ['styles:elements'], reload: true},
        {glob: ['app/{scripts,components,elements}/**/*.ts'], tasks: ['typescript:unit-test', 'test:unit'], reload: true},
        {glob: ['app/{scripts,components,elements}/**/*.js'], tasks: ['jshint'], reload: true},
        {glob: ['app/images/**/*'], reload: true}
    ],
    paths: {
        dest: argv.production ? 'dist' : '.tmp'
    },
    fonts: {
        src: ['app/fonts/**']
    },
    styles: {
        src: [
            'app/app.scss',
            'app/components/**/*.scss',
            'app/{styles,layout,components}/**/*.{sass,scss}',
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
    test: {
        unit: {
            src: 'test/unit/*.js'
        },
        integration: {
            src: 'test/integration/*.js'
        },
        wct: {
            src: ['test/elements']
        }
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
        features: {
            src: 'features/steps/**/*.ts',
            dest: 'features/steps/'
        },
        wct: {
            src: [
                'app/{scripts,test,components,elements}/**/*-spec.ts',
                'app/test/elements/**/*.ts'
            ],
            //dest: 'app/test/elements',
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
    },
    vulcanize: {
        src: 'app/elements/elements.html',
        dest: 'dist/elements'
    }
};

module.exports = config;