describe('LoggerSvc', function() {
	
	var LoggerSvc, $log;

	beforeEach(module('app.core'));

	beforeEach(inject(function(_LoggerSvc_, _$log_) {
		LoggerSvc = _LoggerSvc_;
		$log = _$log_;
	}));

	it('should be registered', function() {
		expect(LoggerSvc).toBeDefined();
	});

	describe('error function', function() {
		it('should exist', function() {
			expect(LoggerSvc.error).toBeDefined();
		});

		it('should log error', function() {
			LoggerSvc.error('test error', {});
			expect($log.error.logs[0]).toContain('Error: test error');
		});
	});

	describe('info function', function() {
		it('should exist', function() {
			expect(LoggerSvc.info).toBeDefined();
		});

		it('should log info', function() {
			LoggerSvc.info('test info', {});
			expect($log.info.logs[0]).toContain('Info: test info');
		});
	});

	describe('success function', function() {
		it('should exist', function() {
			expect(LoggerSvc.success).toBeDefined();
		});

		it('should log success', function() {
			LoggerSvc.success('test success', {});
			expect($log.info.logs[0]).toContain('Success: test success');
		});
	});

	describe('warning function', function() {
		it('should exist', function() {
			expect(LoggerSvc.warning).toBeDefined();
		});

		it('should log warning', function() {
			LoggerSvc.warning('test warning', {});
			expect($log.warn.logs[0]).toContain('Warning: test warning');
		});
	});

	describe('log function', function() {
		it('should exist', function() {
			expect(LoggerSvc.log).toBeDefined();
		});

		it('should log', function() {
			LoggerSvc.log('test log', {});
			expect($log.log.logs[0]).toContain('test log');
		});
	});
});