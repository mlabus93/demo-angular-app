describe('NavbarSvc', function() {

	var NavbarSvc, $httpBackend;
	
	beforeEach(module('app.layout', function($provide, $translateProvider) {
		SpecHelper.fakeTranslator($provide, $translateProvider);
	}));

	SpecHelper.deferRouterIntercept();

	beforeEach(inject(function(_NavbarSvc_, _$httpBackend_) {
		NavbarSvc = _NavbarSvc_;
		$httpBackend = _$httpBackend_;
	}));

	it('should be registered', function() {
		expect(NavbarSvc).toBeDefined();
	});

	describe('getMenu function', function() {
		it('should exist', function() {
			expect(NavbarSvc.getMenu).toBeDefined();
		});

		it('should return three menu items', function() {
			var menuItems = [
				{
					displayName: 'Dashboard',
					state: 'app.dash'
				},
				{
					displayName: 'Settings',
					state: 'app.settings'
				},
				{
					displayName: 'Logout',
					state: 'app.logout'
				}
			];
			$httpBackend.expect('GET', '/server/menu.json').respond(200, menuItems);
			NavbarSvc.getMenu().then(function(data) {
				expect(data.length).toEqual(3);
			});
			$httpBackend.flush();
		});
	});

	SpecHelper.verifyNoOutstandingHttpRequests();
});