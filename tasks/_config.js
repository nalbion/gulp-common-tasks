'use strict';
var argv = require('yargs').argv;

var config = {
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