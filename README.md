# gulp-common-tasks
**Re-usable, customisable default gulp tasks.**

For a full, up-to-date list of tasks provided for your project run:

   gulp help --tasks

The main tasks you may be interested in are:
 
- `clean`
- `copy` - Copy all files at the root level (app)
- `fonts` - Copy web fonts from `app/fonts` to dist
- `html` - Scan your HTML for assets & optimize them
- `icons` - Combines all .svg icons in `app/icons/svg` into font files & css code
- `images` - Optimize images in `app/images`
- `jshint` - Lint JavaScript
- `pagespeed` - Run PageSpeed Insights
- `scripts` - Compile TypeScript to Javascript
- `serve` & `serve:dist` - Run a Browsersync server, watch files for changes & reload
- `styles` - Compile Sass files into css
- `swagger` - Generate client code from Swagger schemas (json or yaml)
- `templates` - Compile Angular HTML templates into a single Javascript file

## Installation

```
sudo npm install -g typescript
sudo npm link typescript
```

## Usage

Your `gulpfile.js` can be as simple as:

```javascript
var gulp = require('gulp');
require('gulp-common-tasks')(gulp);
```

## Application Specific Configuration

You can add or over-ride your project-specific tasks after calling the two lines above.

Some of the tasks provided support (or require) externalised config in `./tasks/_config.js` (relative to your application's root directory).

Your application-specific configuration will be merged in on top of the the default configuration provided in `node_modules/gulp-common-tasks/tasks/_config.js`.


### paths

By default, all output is written to `.tmp`.  If you run `gulp <some-task> --production` the output will be written to `dist`.
You can customise this with by providing alternative configuation in `.tasks/_config.js`:

```javascript
module.exports = {
    paths: {
        dest: argv.production ? 'dist' : '.tmp'
    }
};
```

### TypeScript

The `scripts` task will compile TypeScript into Javascript.  By default it will compile `app/components/**/*.ts`.
If you have TypeScript files in other paths you can provide alternative configuration.

```javascript
module.exports = {
    typescript: {
        src: [
            'app/components/**/*.ts'
        ]
    }
};
```

### Angular Templates

The `templates` task will generate javascript code including all of your html templates.  The default configuration looks like this:

```javascript
module.exports = {
    templates: {
        src: [
            'app/components/**/*.html'
        ],
        options: {
            //module: 'templates',
            //standalone: false,
            //moduleSystem: 'RequireJS'
        }
    }
};    
```

### Swagger

The `swagger` task will do nothing unless you provide an array of schemas:

```javascript
module.exports = {
    swagger: {
        moduleName: 'app',
        dest: '.tmp/',
        schemas: [
            { 'MyApi': 'node_modules/api-package/swagger.yaml' }
        ]
    }
};
```
