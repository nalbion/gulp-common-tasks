var gulp = require('gulp');;

// Generate a list of files that should be precached when serving from 'dist'.
// The list will be consumed by the <platinum-sw-cache> element.
gulp.task('precache', '<Polymer> Generates a list of files to be consumed by <platinum-sw-cache>', function (callback) {
    var glob = require('glob');
    var path = require('path');
    var fs = require('fs');

    var dir = 'dist';
    var config = {
        cacheId: require('./../tasks/__config.js').pkg.name || path.basename(__dirname),
        disabled: false
    };

    glob('{elements,scripts,styles}/**/*.*', {cwd: dir}, function(error, files) {
        if (error) {
            callback(error);
        } else {
            files.push('index.html', './', 'bower_components/webcomponentsjs/webcomponents.min.js');

            config.precache = files;

            var md5 = crypto.createHash('md5');
            md5.update(JSON.stringify(config.precache));
            config.precacheFingerprint = md5.digest('hex');

            var configPath = path.join(dir, 'cache-config.json');
            fs.writeFile(configPath, JSON.stringify(config), callback);
        }
    });
});