//require('./tasks/swagger');
try { require('require-dir')('tasks'); } catch (err) { console.error(err); }

// Adds the tasks defined within this package to the gulp object provided
module.exports = function(gulp) {
    var tasks = require('gulp').tasks;
    var taskKeys = Object.keys(tasks);
    for (var i = 0; i < taskKeys.length; i++) {
        var key = taskKeys[i],
            task = tasks[key];
        gulp.task(key, task.dep, task.fn);
    }
};