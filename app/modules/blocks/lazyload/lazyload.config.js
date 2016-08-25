(function() {
	'use strict';

	angular
		.module('blocks.lazyload')
		.config(LazyLoadConfig);

	/* ngInject */
	function LazyLoadConfig($ocLazyLoadProvider, APP_REQUIRES) {
		// modules configuration
		$ocLazyLoadProvider.config({
			debug: false,
			events: true,
			modules: APP_REQUIRES.modules
		});
	}
})();