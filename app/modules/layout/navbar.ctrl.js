(function() {
	'use strict';

	angular
		.module('app.layout')
		.controller('NavbarCtrl', NavbarCtrl);

	NavbarCtrl.$inject = ['$rootScope', '$state', 'NavbarSvc', 'RouteStateSvc'];

	function NavbarCtrl($rootScope, $state, NavbarSvc, RouteStateSvc) {
		var vm = this;

		$rootScope.menuItems = [];
		vm.items= [];

		vm.goToState = goToState;

		activate();

		function activate() {
			return getMenu().then(function() {
				RouteStateSvc.setActiveState($state.current.name);
			});
		}

		function getMenu() {
			return NavbarSvc.getMenu().then(function(data) {
				$rootScope.menuItems = data;
				vm.items = data;
				return vm.items;
			});
		}

		function goToState(state) {
			$state.go(state);
		}
	}
})();