'use strict';

var gulp = require('gulp');
var config = require('./../tasks/__config.js');

gulp.task('swagger:angular', '<Angular> Generates API services - see the README', function () {
    var path = require('path');

    if (config && config.swagger) {
        var fs = require('fs');

        var CodeGen = require('swagger-js-codegen').CodeGen;
        var dest = config.swagger.dest || '.tmp/js';

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
                moduleName: schema.moduleName || config.swagger.moduleName,
                className: name,
                swagger: swagger
            });
            fs.writeFileSync(path.resolve(dest, name + '.js'), angularjsSourceCode);
        }
    }
});

gulp.task('swagger:polymerts', '<Polymer TypeScript> Generates API services - see the README', function () {
    var path = require('path');

    if (config && config.swagger) {
        var fs = require('fs');

        var CodeGen = require('swagger-js-codegen').CodeGen;
        var dest = config.swagger.dest || '.tmp/ts';

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

            //if ((swagger.info || (swagger.info = {})) && !swagger.info.description) {
            //    swagger.info.description = 'Generated by swagger-js-codegen via `gulp swagger:polymerts`';
            //}
            var swaggerOpts = {
                moduleName: schema.moduleName || config.swagger.moduleName,
                className: name,
                swagger: swagger,
lint: false,
                template: {
                    class: fs.readFileSync(__dirname + '/templates/polymer-ts-swagger-class.mustache', 'utf-8'),
                    method: fs.readFileSync(__dirname + '/templates/polymer-ts-swagger-method.mustache', 'utf-8'),
                    request: fs.readFileSync(__dirname + '/templates/polymer-ts-swagger-request.mustache', 'utf-8')
                }
            };
            //var tsSourceCode = CodeGen.getAngularCode(swaggerOpts);
            var tsSourceCode = CodeGen.getCustomCode(swaggerOpts);

            var typeScriptDefinition = CodeGen.getTypeScriptDefinition(swaggerOpts, function (resultType) {
                return 'Promise<' + resultType + '>';
            });

            fs.writeFileSync(path.resolve(dest, name + '.ts'), tsSourceCode);
            fs.writeFileSync(path.resolve(dest, name + '.d.ts'), typeScriptDefinition);
        }
    }
});