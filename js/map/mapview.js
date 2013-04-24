define(['jquery', 'underscore', 'backbone', 'dojo/dom-construct', 'esri/map', 'esri/geometry', 'esri/layers/GraphicsLayer', 'esri/graphic', 'map/crimetyperenderer', 'esri/dijit/Popup', 'esri/InfoTemplate', 'appconfig', 'text!map/infowindow.html', 'dojo/date/locale'], function ($, _, Backbone, domConstruct, EsriMap, esriGeometry, GraphicsLayer, Graphic, crimeTypeRenderer, Popup, InfoTemplate, appConfig, infoContentTemplate, locale) {
	'use strict';

	var MapView = Backbone.View.extend({
		initialize: function () {
			this.listenTo(this.collection, 'reset', this._handleCrimesReset);
		},
		render: function () {
			var popup = new Popup(null, domConstruct.create('div'));

			this._mapWidget = new EsriMap(this.$el.attr('id'), {
				basemap: appConfig.basemap,
				extent: new esriGeometry.Extent(appConfig.initialExtent),
				logo: false,
				fitExtent: true,
				infoWindow: popup
			});

			this._crimeLayer = new GraphicsLayer({
				id: 'crimes'
			});
			this._crimeLayer.setRenderer(crimeTypeRenderer);
			this._mapWidget.addLayer(this._crimeLayer);
		},
		_getContent: function (graphic) {
			var time = graphic.attributes.time;
			var dateTest = Date.parse(graphic.attributes.time);
			if (isNaN(dateTest) === false) {
				time = locale.format(new Date(graphic.attributes.time), {
					datePattern: 'EEEE, MMMM d, yyy'
				});
			}

			return _.template(infoContentTemplate, {
				type: graphic.attributes.type,
				time: time,
				personDescription: graphic.attributes.personDescription,
				vehicleDescription: graphic.attributes.vehicleDescription,
				notes: graphic.attributes.notes,
				links: graphic.attributes.additionalLinks
			});
		},
		_handleCrimesReset: function () {
			var layer = this._crimeLayer;
			layer.clear();

			var template = new InfoTemplate('${title}', this._getContent);
			_.each(this.collection.models, function (crime) {
				var location = new esriGeometry.Point(crime.get('location').x, crime.get('location').y);

				var attributes = _.extend(crime.attributes, {
					title: crime.get('location').description
				});
				layer.add(new Graphic(location, null, crime.attributes, template));
			});
		}
	});

	return MapView;
});