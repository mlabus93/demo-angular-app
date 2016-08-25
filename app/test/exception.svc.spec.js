describe('ExceptionSvc', function() {
	
	var ExceptionSvc, $log;

	beforeEach(module('app.core'));

	beforeEach(inject(function(_ExceptionSvc_, _$log_) {
		ExceptionSvc = _ExceptionSvc_;
		$log = _$log_;
	}));

	it('should be registered', function() {
		expect(ExceptionSvc).toBeDefined();
	});

	describe('catcher function', function() {
		it('should exist', function() {
			expect(ExceptionSvc.catcher).toBeDefined();
		});

		it('should have no logs', function() {
			$log.assertEmpty();
		});

		it('should log the message "Error: this is a test" with empty object data', function() {
			ExceptionSvc.catcher('this is a test')({});
			expect($log.error.logs[0]).toContain('Error: this is a test');
		});
	});
});