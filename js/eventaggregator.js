// eventAggregator.trigger('someEvent', someData)
// eventAggregator.on('someEvent', function (someData) {})
define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
	'use strict';
	return _.extend({}, Backbone.Events);
});