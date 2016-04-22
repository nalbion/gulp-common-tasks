var path = require('path'),
    fs = require('fs'),
    _ = require('lodash');

var cache = {};

// Attempt to find a an application-specific version of the specified file.
// If an application-specific version does exist, its values will over-ride the defaults
module.exports = function(fileName) {
    var result = cache[fileName];
    if (result) { return result; }

    var result = require('./' + fileName);
    var filePath = path.resolve('tasks/' + fileName);

    if (fs.existsSync(filePath)) {
        _.merge(result, require(filePath));
    }

    cache[fileName] = result;
    return result;
};

