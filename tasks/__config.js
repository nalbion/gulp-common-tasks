var require_merge = require('./_require-merge.js');
var config = require_merge('_config.js');

config.pkg = require(require('path').resolve('package.json'));

module.exports = config;