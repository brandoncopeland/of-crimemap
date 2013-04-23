define(['jquery', 'underscore', 'backbone', 'esri/map', 'esri/geometry', 'esri/layers/GraphicsLayer', 'esri/graphic', 'map/crimetyperenderer', 'appconfig'], function ($, _, Backbone, EsriMap, esriGeometry, GraphicsLayer, Graphic, crimeTypeRenderer, appConfig) {
	'use strict';

	var MapView = Backbone.View.extend({
		initialize: function () {
			this.listenTo(this.collection, 'reset', this._handleCrimesReset);
		},
		render: function () {
			this._mapWidget = new EsriMap(this.$el.attr('id'), {
				basemap: appConfig.basemap,
				extent: new esriGeometry.Extent(appConfig.initialExtent),
				logo: false,
				fitExtent: true
			});

			this._crimeLayer = new GraphicsLayer({
				id: 'crimes'
			});
			this._crimeLayer.setRenderer(crimeTypeRenderer);
			this._mapWidget.addLayer(this._crimeLayer);
		},
		_handleCrimesReset: function () {
			var layer = this._crimeLayer;
			layer.clear();

			_.each(this.collection.models, function (crime) {
				var location = new esriGeometry.Point(crime.get('location').x, crime.get('location').y);
				layer.add(new Graphic(location, null, crime.attributes));
			});
		}
	});

	return MapView;
});