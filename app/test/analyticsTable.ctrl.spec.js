describe('AnalyticsTableCtrl', function() {

	var $controller, vm, ngTable;

	beforeEach(module('app.core'));
	beforeEach(module('app.analytics'));

	function mockNgTable() {
		// NgTable is lazyloaded so constructor is coming up as undefined trying to run unit test.
		// Looking for a work around
	}

	beforeEach(inject(function(_$controller_, _NgTableParams_) {
		$controller = _$controller_;
		vm = $controller('AnalyticsTableCtrl', {
			NgTableParams: _NgTableParams_
		});
	}));

	it('should be defined', function() {
		expect(vm).toBeDefined();
	});

	describe('after activate', function() {
		it('should have items list with 4 items', function() {
			expect(vm.items.length).toEqual(4);
		});
	});
});