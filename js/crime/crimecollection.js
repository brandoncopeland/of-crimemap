define(['jquery', 'underscore', 'backbone', 'appconfig'], function ($, _, Backbone, appConfig) {
	'use strict';

	var CrimeCollection = Backbone.Collection.extend({
		url: appConfig.crimeService.url
	});

	return CrimeCollection;
});