'use strict';

// Include Gulp & tools we'll use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var require_merge = require('./_require-merge.js');
var config = require_merge('_config.js');

// Clean output directory
gulp.task('clean', del.bind(null, config.clean, {dot: true}));
