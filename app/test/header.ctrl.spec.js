describe('HeaderCtrl', function() {

	var $controller, vm;

	beforeEach(module('app.layout'));
	beforeEach(inject(function(_$controller_) {
		$controller = _$controller_;
		vm = $controller('HeaderCtrl');
	}));

	it('should be defined', function() {
		expect(vm).toBeDefined();
	});
});