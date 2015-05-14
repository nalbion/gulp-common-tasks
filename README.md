You `gulpfile.js` can be as simple as:

```javascript
var gulp = require('gulp');
require('gulp-tasks')(gulp);
```

You can add or over-ride your project-specific tasks after calling the two lines above.

Some of the tasks provided support (or require) externalised config in `./tasks/_config.js`.

# swagger

The swagger task will do nothing unless you provide an array of schemas:

```javascript
module.exports = {
    swagger: {
        dest: '.tmp/',
        schemas: [
            { 'MyApi': 'node_modules/api-package/swagger.yaml' }
        ]
    }
};
```