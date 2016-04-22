'use strict';

// Include Gulp & tools we'll use
var gulp = require('gulp');
var del = require('del');
var config = require('./__config.js');

// Clean output directory
gulp.task('clean', 'Deletes ' + config.clean, del.bind(null, config.clean, {dot: true}));
