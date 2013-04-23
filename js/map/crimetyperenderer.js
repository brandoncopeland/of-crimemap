define(['dojo', 'esri/renderers/UniqueValueRenderer', 'esri/symbols/SimpleMarkerSymbol'], function (dojo, UniqueValueRenderer, SimpleMarkerSymbol) {
	'use strict';

	var defaultSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 14, null, new dojo.Color([35, 232, 86, 0.7]));
	var renderer = new UniqueValueRenderer(defaultSymbol, 'type');

	renderer.addValue({
		value: 'Driveway Robbery',
		symbol: new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 14, null, new dojo.Color([232, 35, 116, 0.7])),
		label: 'Driveway Robbery',
		description: ''
	});

	return renderer;
});