'use strict';
var argv = require('yargs').argv;

var config = {
    watch: [
        {glob: ['app/**/*.html'], tasks: ['templates'], reload: true},
        {glob: ['app/**/*.{scss,css}'], tasks: ['styles'], reload: true},
        {glob: ['app/**/*.ts'], tasks: ['scripts'], reload: true},
        {glob: ['app/**/*.js'], tasks: ['jshint'], reload: true},
        {glob: ['app/images/**/*'], reload: true}
    ],
    paths: {
        dest: argv.production ? 'dist' : '.tmp'
    },
    typescript: {
        src: [
            'app/app*.ts',
            'app/components/**/*.ts'
        ]
    },
    templates: {
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