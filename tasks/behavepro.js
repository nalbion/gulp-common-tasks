var gulp = require('gulp');
var BehavePro = require('behavepro');
var config = require('./__config.js');

if (config.behavepro) {
    gulp.task('behavepro', 'Downloads BDD features from JIRA', function (done) {
        BehavePro({
            id: config.behavepro.projectId,
            userId: config.behavepro.userId,
            apiKey: config.behavepro.apiKey
        }, function () {
            done();
        });
    });
}