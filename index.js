//require('./tasks/swagger');
require('gulp-help')(require('gulp'));
try { require('require-dir')('tasks'); } catch (err) { console.error(err); }

// Adds the tasks defined within this package to the gulp object provided
module.exports = function(gulp) {
    require('./tasks/clean.js');

    var tasks = require('gulp').tasks;
    var taskKeys = Object.keys(tasks);
    for (var i = 0; i < taskKeys.length; i++) {
        var key = taskKeys[i],
            task = tasks[key];
        gulp.task(key, task.dep, task.fn);
    }

    gulp.task('default', function() {
        var pkg = require('./tasks/__config.js').pkg;
        console.info('=================================================================');
        console.info('                     ' + pkg.name + ' ' + pkg.version);
        console.info('                        gulp-common-tasks                        ');
        console.info('=================================================================');
        console.info('Most of the tasks & config for this project have been defined by');
        console.info('    https://github.com/nalbion/gulp-common-tasks');
        console.info('For more info run:');
        console.info('    less node_modules/gulp-common-tasks/README.md');
        //return require('gulp-task-listing').withFilters(null, 'default')();
        return require('run-sequence')('help');
    });
};