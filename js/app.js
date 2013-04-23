define(['jquery', 'map/mapview'], function ($, MapView) {
	'use strict';

	var application = {
		initialize: function () {
			var mapView = new MapView({
				el: $('#bigmap')
			});
			mapView.render();
		}
	};

	return application;
});