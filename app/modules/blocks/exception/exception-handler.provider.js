(function() {
	'use strict';

	angular
		.module('blocks.exception')
		.provider('exceptionHandler', exceptionHandlerProvider)
		.config(config);

	function exceptionHandlerProvider() {
		this.config = {
			appErrorPrefix: undefined
		};

		// set error prefix for module configs
		this.configure = function(appErrorPrefix) {
			this.config.appErrorPrefix = appErrorPrefix;
		};

		this.$get = function() {
			return {config: this.config};
		};
	}

	/* ngInject */
	function config($provide) {
		$provide.decorator('$exceptionHandler', extendExceptionHandler);
	}


	// extends base exception handler to use logger service
	function extendExceptionHandler($delegate, exceptionHandler, LoggerSvc) {
		return function(exception, cause) {
			var appErrorPrefix = exceptionHandler.config.appErrorPrefix || '';
			var errorData = {exception: exception, cause: cause};
			exception.message = appErrorPrefix + exception.message;
			$delegate(exception, cause);
			LoggerSvc.error(exception.message, errorData);
		};
	}
})();