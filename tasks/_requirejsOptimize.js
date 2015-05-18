var argv = require('yargs').argv;

module.exports = {
  generateSourceMaps: true,
  preserveLicenseComments: false,
  //shim: {
  //  // standard require.js shim options
  //  angular: {
  //    exports: 'angular'
  //  },
  //  'angular2-now': ['angular']
  //},
  /* Only available when running in java
   optimize: 'closure',
   closure: {
   CompilerOptions: {},
   CompilationLevel: 'ADVANCED_OPTIMIZATIONS',
   loggingLevel: 'WARNING'
   }*/
  optimize: 'uglify2',
  uglify2: {
    output: {
      beautify: !argv.production
    },
    compress: {
      sequences: false,
      global_defs: {
        DEBUG: !argv.production
      }
    },
    warnings: true,
    mangle: argv.production
  }
  //insertRequire: ['module']
};
