(function() {
	'use strict';

	var core = angular.module('app.core');

	var config = {
		appErrorPrefix: '[VTS App Error] ',
		appTitle: 'VTS App Demo',
		version: '1.0.0'
	};

	core.config(configure);

	/* @ngInject */
	function configure($logProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, exceptionHandlerProvider) {
		// turn debugging off/on
		if ($logProvider.debugEnabled) {
			$logProvider.debugEnabled(true);
		}

		core.controller = $controllerProvider.register;
		core.directive = $compileProvider.directive;
		core.filter = $filterProvider.register;
		core.factory = $provide.factory;
		core.service = $provide.service;
		core.constant = $provide.constant;
		core.value = $provide.value;

		// Configure common exception handler
		exceptionHandlerProvider.configure(config.appErrorPrefix);
	}
})();