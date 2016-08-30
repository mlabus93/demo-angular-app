(function() {
	'use strict';

	angular
		.module('blocks.router')
		.factory('RouteStateSvc', RouteStateSvc);

	/* ngInject */
	function RouteStateSvc($rootScope) {
		var service = {
			setActiveState: setActiveState,
			setAllStatesInactive: setAllStatesInactive
		};

		return service;

		function setActiveState(state) {
			for (var i=0; i<$rootScope.menuItems.length; i++) {
				// check if state is found
				if ($rootScope.menuItems[i].state === state) {
					$rootScope.menuItems[i].active = true;
				}
				// check if state has submenu state
				else if ($rootScope.menuItems[i].submenu) {
					for (var j=0; j<$rootScope.menuItems[i].submenu.length; j++) {
						// if submenu state is state, activate parent state
						if( $rootScope.menuItems[i].submenu[j].state === state) {
							$rootScope.menuItems[i].active = true;
						}
						// deactivate parent state otherwise
						else {
							$rootScope.menuItems[i].active = false;
						}
					}
				}
				// deactivate state if not current state
				else {
					$rootScope.menuItems[i].active = false;
				}
			}
		}

		function setAllStatesInactive() {
			for (var i=0; i<$rootScope.menuItems.length; i++) {
				$rootScope.menuItems[i].active = false;
			}
		}
	}
})();