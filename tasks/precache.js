var gulp = require('gulp');
var glob = require('glob');
var path = require('path');
var fs = require('fs');

// Generate a list of files that should be precached when serving from 'dist'.
// The list will be consumed by the <platinum-sw-cache> element.
gulp.task('precache', function (callback) {
    var dir = 'dist';

    glob('{elements,scripts,styles}/**/*.*', {cwd: dir}, function(error, files) {
        if (error) {
            callback(error);
        } else {
            files.push('index.html', './', 'bower_components/webcomponentsjs/webcomponents.min.js');
            var filePath = path.join(dir, 'precache.json');
            fs.writeFile(filePath, JSON.stringify(files), callback);
        }
    });
});