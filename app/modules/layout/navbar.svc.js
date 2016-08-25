(function() {
	'use strict';

	angular
		.module('app.layout')
		.factory('NavbarSvc', NavbarSvc);

	NavbarSvc.$inject = ['$http', 'ExceptionSvc'];

	function NavbarSvc($http, ExceptionSvc) {
		var service = {
			getMenu: getMenu
		};
		return service;

		function getMenu() {
			return $http.get('/server/menu.json')
				.then(getMenuSuccess)
				.catch(function(error) {
					ExceptionSvc.catcher('XHR failed for getMenu')(error);
				});

			function getMenuSuccess(response) {
				return response.data;
			}
		}
	}
})();