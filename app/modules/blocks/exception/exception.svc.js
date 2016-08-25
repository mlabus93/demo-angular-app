(function() {
	'use strict';

	angular
		.module('blocks.exception')
		.factory('ExceptionSvc', ExceptionSvc);

	/* ngInject */
	function ExceptionSvc(LoggerSvc) {
		var service = {
			catcher: catcher
		};
		return service;

		function catcher(message) {
			return function(reason) {
				LoggerSvc.error(message, reason);
			};
		}
	}
})();