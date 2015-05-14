'use strict';

var gulp = require('gulp');
var path = require('path');
var config = require(path.resolve('./tasks/_config'));

gulp.task('swagger', function () {
    if (config && config.swagger) {
        var fs = require('fs');

        var CodeGen = require('swagger-js-codegen').CodeGen;
        var dest = config.swagger.dest || '.tmp/';

        for (var i = 0; i < config.swagger.schemas.length; i++) {
            var schema = config.swagger.schemas[i],
                name = Object.keys(schema)[0],
                file = path.resolve(schema[name]);

            if (file.match(/.*\.json$/)) {
                var swagger = JSON.parse(fs.readFileSync(file, 'UTF-8'));
            } else {
                var YAML = require('yamljs');
                var swagger = YAML.parse(fs.readFileSync(file, 'UTF-8'));
            }

            var angularjsSourceCode = CodeGen.getAngularCode({
                moduleName: config.swagger.moduleName,
                className: name,
                swagger: swagger
            });
            fs.writeFileSync(path.resolve(dest, name + '.js'), angularjsSourceCode);
        }
    }
});