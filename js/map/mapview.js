define(['jquery', 'underscore', 'backbone', 'dojo', 'esri/map', 'esri/geometry', 'esri/layers/GraphicsLayer', 'esri/symbols/SimpleMarkerSymbol', 'esri/graphic', 'appconfig'], function ($, _, Backbone, dojo, EsriMap, esriGeometry, GraphicsLayer, SimpleMarkerSymbol, Graphic, appConfig) {
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
			this._mapWidget.addLayer(this._crimeLayer);
		},
		_handleCrimesReset: function () {
			var layer = this._crimeLayer;
			layer.clear();

			var symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 14, null, new dojo.Color([232, 35, 116, 0.7]));
			_.each(this.collection.models, function (crime) {
				var location = new esriGeometry.Point(crime.get('location').x, crime.get('location').y);
				layer.add(new Graphic(location, symbol, crime.attributes));
			});
		}
	});

	return MapView;
});