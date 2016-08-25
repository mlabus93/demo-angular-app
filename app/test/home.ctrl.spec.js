describe('HomeCtrl', function() {

	var $controller, vm, LoggerSvc;

	beforeEach(module('app.home'));
	beforeEach(inject(function(_$controller_) {
		$controller = _$controller_;
		vm = $controller('HomeCtrl');
	}));

	it('should be defined', function() {
		expect(vm).toBeDefined();
	});

	it('should have default homeInfo named "This is the home page."', function() {
		expect(vm.homeInfo).toBe('This is the home page.');
	});

	describe('resetHomeInfo function', function() {
		it('should exist', function() {
			expect(vm.resetHomeInfo).toBeDefined();
		});

		it('should change homeInfo back to default value', function() {
			// assign to non-default value
			vm.homeInfo = 'Not the default value';
			vm.resetHomeInfo();
			expect(vm.homeInfo).toBe('This is the home page.');
		});
	});

	describe('updateHomeInfo function', function() {
		it('should exist', function() {
			expect(vm.updateHomeInfo).toBeDefined();
		});

		it('should update homeInfo to the new value passed in', function() {
			var inputToBePassedIn = 'testing new input...';
			vm.updateHomeInfo(inputToBePassedIn);
			expect(vm.homeInfo).toBe(inputToBePassedIn);
		});
	});
});