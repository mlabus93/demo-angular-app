(function() {
	'use strict';

	angular
		.module('app.home')
		.controller('HomeCtrl', HomeCtrl);

	HomeCtrl.$inject = ['LoggerSvc'];
	function HomeCtrl(LoggerSvc) {
		var vm = this;

		var defaultHomeInfo = 'This is the home page.';

		vm.homeInfo = defaultHomeInfo;
		vm.resetHomeInfo = resetHomeInfo;
		vm.updateHomeInfo = updateHomeInfo;
		activate();

		function activate() {
			LoggerSvc.info("Home activated...", null);
		}

		function resetHomeInfo() {
			vm.homeInfo = defaultHomeInfo;
			// set input box back to empty on reset
			vm.infoInput = '';
		}

		function updateHomeInfo(inputInfo) {
			vm.homeInfo = inputInfo;
		}
	}
})();