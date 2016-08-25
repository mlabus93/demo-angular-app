(function() {
	'use strict';

	angular
		.module('app.analytics')
		.controller('AnalyticsTableCtrl', AnalyticsTableCtrl);

	AnalyticsTableCtrl.$inject = ['NgTableParams', 'LoggerSvc'];

	function AnalyticsTableCtrl(NgTableParams, LoggerSvc) {
		var vm = this;
		vm.items = [
		{
			name: "Item 1",
			color: "blue",
			shape: "rectangle"
		},
		{
			name: "Item 2",
			color: "red",
			shape: "circle"
		},
		{
			name: "Item 3",
			color: "green",
			shape: "trapezoid"
		},
		{
			name: "Item 4",
			color: "orange",
			shape: "hexagon"
		}
		];
		vm.refreshTable = refreshTable;

		activate();

		function activate() {

			vm.table = new NgTableParams({
				page: 1,
				count: 5
			}, {
				total: vm.items.length,
				counts: ['3', '5', '10', '20'],
				dataset: vm.items
			});
			LoggerSvc.info('Table created...', null);
		}

		function refreshTable() {
			vm.table.reload();
		}
	}
})();