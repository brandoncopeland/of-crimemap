define(['jquery', 'underscore', 'backbone', 'esri/map', 'esri/geometry', 'appconfig'], function ($, _, Backbone, EsriMap, esriGeometry, appConfig) {
	'use strict';

	var MapView = Backbone.View.extend({
		className: 'js-map mapcontainer',
		render: function () {
			this._mapWidget = new EsriMap(this.$el.attr('id'), {
				basemap: appConfig.basemap,
				extent: new esriGeometry.Extent(appConfig.initialExtent),
				logo: false,
				fitExtent: true
			});
		}
	});

	return MapView;
});