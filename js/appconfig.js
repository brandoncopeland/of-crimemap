// application wide configuration values
// define web service endpoints for different deployments, etc...
define(['jquery', 'text!config/appconfig.json'], function ($, configuration) {
	'use strict';
	var config = $.parseJSON(configuration); // could include other logic here, like different file for different environment, etc...
	return config;
});