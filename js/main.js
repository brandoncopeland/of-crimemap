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
      'templates': '../templates',
      'data': '../data',
      'config': '../config',
      'map': 'map',
      'crime': 'crime',
      'appconfig': 'appconfig',
      'eventaggregator': 'eventaggregator',
      'app': 'app'
    },
    packages: [{
      name: 'dojo',
      location: 'lib/dojo'
    }, {
      name: 'dijit',
      location: 'lib/dijit'
    }, {
      name: 'dojox',
      location: 'lib/dojox'
    }, {
      name: 'esri',
      location: 'lib/esri'
    }, {
      name: 'underscore',
      location: 'lib',
      main: 'underscore-amd-min'
    }, {
      name: 'backbone',
      location: 'lib',
      main: 'backbone-amd-min'
    }]
  });

  window.define.amd.jQuery = true;

  require(['app'], function (app) {
    app.initialize();
  });

}(require));