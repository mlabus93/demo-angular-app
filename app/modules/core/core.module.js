(function() {
	'use strict';

	angular.module('app.core', [
		// Angular modules
		//'ngAnimate',
		'ngRoute',
		'oc.lazyLoad',
		'ui.router',
		'pascalprecht.translate',
		'ngTable',
		//'ngSanitize',
		// Reusable cross app core modules
		'blocks.exception',
		'blocks.logger',
		'blocks.router',
		'blocks.translate'
	]);
})();