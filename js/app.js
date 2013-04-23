define(['jquery', 'map/mapview', 'crime/crimecollection'], function ($, MapView, CrimeCollection) {
	'use strict';

	var application = {
		initialize: function () {
			var crimeCollection = new CrimeCollection();

			var mapView = new MapView({
				el: $('#bigmap'),
				collection: crimeCollection
			});
			mapView.render();

			crimeCollection.fetch({
				reset: true
			});
		}
	};

	return application;
});