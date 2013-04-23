(function (require) {
  'use strict';

  require({
    baseUrl: 'js',
    parseOnLoad: true,
    aliases: [
      ['text', 'dojo/text'],
      ['ready', 'dojo/domReady']
    ],
    paths: {
      'jquery': 'lib/jquery',
      'underscore': 'lib/underscore',
      'backbone': 'lib/backbone',
      'esri': 'lib/esri',
      'templates': '../templates',
      'data': '../data',
      'config': '../config',
      'app': 'app'
    },
    packages: [
      { name: 'dojo', location: 'lib/dojo' },
      { name: 'dijit', location: 'lib/dijit' },
      { name: 'dojox', location: 'lib/dojox' },
      { name: 'esri', location: 'lib/esri' }
    ]
  });

  require(['app'], function (app) {
    app.initialize();
  });

}(require));