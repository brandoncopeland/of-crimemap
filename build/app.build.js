({
  appDir: '../',
  baseUrl: 'js',
  dir: '../../of-crimemap-build',
  paths: {
    'jquery': 'lib/jquery',
    'dojo': 'lib/dojo',
    'dojox': 'lib/dojox',
    'dijit': 'lib/dijit',
    'esri': 'lib/esri',
    'underscore': 'lib/underscore',
    'backbone': 'lib/backbone',
    'templates': '../templates',
    'config': '../config',
    'data': '../data',
    'text': 'lib/dojo/text',
    'ready': 'lib/dojo/domReady'
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
    name: 'app',
    excludeShallow: [
      'text!config/appconfig.json'
    ]
  }],
  removeCombined: false,
  inlineText: true,
  optimize : 'uglify',
  optimizeCss: 'standard',
  fileExclusionRegExp: /^(\.|scss|build|docs|README\.md)/, // could be better but works well enough for now
  preserveLicenseComments: true
})