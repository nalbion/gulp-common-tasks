module.exports = {
//    typescript: require('typescript'),
    sortOutput: true,
    declarationFiles: true,
    //noExternalResolve: true,
    experimentalDecorators: true,
    //mapRoot: '../bower_components',
    //emitDecoratorMetadata: true,
    //declaration: false,
    // use SystemJS to build your files to es5 with System.register wrapper
    //target: 'ES6'
    target: 'ES5',
    module: 'amd'       // commonjs (for Node) or amd (eg RequireJS for web)
    // SystemJS for web?  https://github.com/ivogabe/gulp-typescript/issues/243
};
