(function() {
	'use strict';

	angular.module('app', [
		// Shared
		'app.core',
		'app.utils',

		// Features
		'app.analytics',
		'app.home',
		'app.layout',
		'app.reports'
	]);
})();