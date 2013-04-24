define(['dojo', 'esri/renderers/UniqueValueRenderer', 'esri/symbols/SimpleMarkerSymbol'], function (dojo, UniqueValueRenderer, SimpleMarkerSymbol) {
	'use strict';

	var defaultSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 14, null, new dojo.Color([80, 80, 80, 0.7]));
	var renderer = new UniqueValueRenderer(defaultSymbol, 'type');

	renderer.addValue({
		value: 'Driveway Robbery',
		symbol: new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 14, null, new dojo.Color([236, 47, 46, 0.7])),
		label: 'Driveway Robbery',
		description: ''
	});

	renderer.addValue({
		value: 'Store Robbery',
		symbol: new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 14, null, new dojo.Color([4, 122, 138, 0.7])),
		label: 'Store Robbery',
		description: ''
	});

	renderer.addValue({
		value: 'Home Burglary',
		symbol: new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 14, null, new dojo.Color([43, 163, 176, 0.7])),
		label: 'Home Burglary',
		description: ''
	});

	renderer.addValue({
		value: 'Car Break-in',
		symbol: new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 14, null, new dojo.Color([34, 114, 119, 0.7])),
		label: 'Car Break-in',
		description: ''
	});

	renderer.addValue({
		value: 'Suspect Chase',
		symbol: new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 14, null, new dojo.Color([119, 119, 131, 0.7])),
		label: 'Suspect Chase',
		description: ''
	});

	return renderer;
});