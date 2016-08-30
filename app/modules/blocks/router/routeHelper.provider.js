(function() {
	'use strict';

	angular
		.module('blocks.router')
		.provider('RouteHelper', RouteHelperProvider);

	RouteHelperProvider.$inject = ['APP_REQUIRES'];
	/* ngInject */
	function RouteHelperProvider(APP_REQUIRES) {
		this.config = {
			basepath: basepath,
			resolveFor: resolveFor
		};

		this.$get = function() {
			return {
				config: this.config
			};
		};

		// sets basepath to html views
		function basepath(uri) {
			return 'dist/views/' + uri;
		}

		// resolve dependencies by lazyloading modules and/or functions
		function resolveFor() {
			var modules = arguments;
			return {
				deps: ['$ocLazyLoad', '$q', function($ocLL, $q) {
					// create empty promise
					var promise = $q.when(1);
					// chain promises of modules/functions
					for (var i=0; i<modules.length; i++) {
						promise = andThen(modules[i]);
					}
					return promise;

					function andThen(module) {
						if (typeof module === 'function') {
							return promise.then(module);
						}
						else {
							return promise.then(function() {
								var itemToLoad = getRequired(module);
								if (!itemToLoad) {
									return $.error('Route Resolution Error: Bad name [' + module + ']');
								}
								// lazyload the module
								return $ocLL.load(itemToLoad);
							});
						}
					}
					// gets module objects or scripts
					function getRequired(name) {
						if (APP_REQUIRES.modules) {
							for (var m in APP_REQUIRES.modules) {
								if (APP_REQUIRES.modules[m].name && APP_REQUIRES.modules[m].name === name) {
									return APP_REQUIRES.modules[m];
								}
							}
						}
						return APP_REQUIRES.scripts && APP_REQUIRES.scripts[name];
					}
				}]
			};
		}
	}
})();