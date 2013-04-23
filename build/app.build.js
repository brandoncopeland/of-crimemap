({
  appDir: '../',
  baseUrl: 'js',
  dir: '../../of-crimemap-build',
  paths: {
    'jquery': 'lib/jquery-1.8.2',
    'underscore': 'lib/underscore',
    'backbone': 'lib/backbone',
    'templates': '../templates',
    'config': '../config',
    'data': '../data',
    'text': 'plugins/text'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    }
  },
  modules: [{
    name: 'app'
  }],
  removeCombined: false,
  inlineText: true,
  optimize : 'uglify',
  optimizeCss: 'standard',
  fileExclusionRegExp: /^(\.|scss|build|docs|README\.md)/, // could be better but works well enough for now
  preserveLicenseComments: true
})