(function (require) {
  'use strict';

  require.config({
    baseUrl: 'js',
    paths: {
      'text': 'plugins/text',
      'jquery': 'lib/jquery',
      'underscore': 'lib/underscore',
      'backbone': 'lib/backbone',
      'templates': '../templates',
      'data': '../data',
      'config': '../config'
    },
    shim: {
      'underscore': {
        exports: '_'
      },
      'backbone': {
        deps: [
          'jquery',
          'underscore'
        ],
        exports: 'Backbone'
      }
    }
  });

  require(['app'], function (app) {
    app.initialize();
  });

}(require));