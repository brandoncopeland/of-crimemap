(function (require, jasmine) {
  'use strict';

  require.config({
    baseUrl: 'js',
    paths: {
      'text': 'plugins/text',
      'jquery': 'lib/jquery',
      'underscore': 'lib/underscore',
      'backbone': 'lib/backbone',
      'specs': '../specs',
      'templates': '../templates',
      'data': '../data',
      'config': '../config'
    },
    shim: {
      'underscore': {
        exports: '_'
      },
      'backbone': {
        deps: ['jquery', 'underscore'],
        exports: 'Backbone'
      }
    }
  });

	var specs = ['jquery', 'specs/alwayswins']; // jquery can be removed if any modules references it, added to make jasmine-jquery happy
	require(specs, function () {
		var jasmineEnv = jasmine.getEnv();
		jasmineEnv.updateInterval = 1000;

		var htmlReporter = new jasmine.HtmlReporter();
		jasmineEnv.addReporter(htmlReporter);

		jasmineEnv.specFilter = function (spec) {
			return htmlReporter.specFilter(spec);
		};

    jasmineEnv.execute();
	});
}(require, jasmine));