describe('RouteStateSvc', function() {

	var RouteStateSvc, $rootScope;
	
	beforeEach(module('app.core', function($provide, $translateProvider) {
		SpecHelper.fakeTranslator($provide, $translateProvider);
	}));

	SpecHelper.deferRouterIntercept();

	beforeEach(inject(function(_RouteStateSvc_, _$rootScope_) {
		RouteStateSvc = _RouteStateSvc_;
		$rootScope = _$rootScope_;

		$rootScope.menuItems = [
			{
				displayName: 'dashboard', state: 'app.dashboard'
			},
			{
				displayName: 'settings', state: 'app.settings'
			},
			{
				displayName: 'logout', state: 'app.logout', active: true
			}
		];
	}));

	it('should be registered', function() {
		expect(RouteStateSvc).toBeDefined();
	});

	describe('setActiveState function', function() {
		it('should exist', function() {
			expect(RouteStateSvc.setActiveState).toBeDefined();
		});

		it('should set "mockMenuItem" active', function() {
			// create mock menu item
			var mockMenuItem = { displayName: 'test', state: 'app.test', active: false};
			// add mock menu item to list of items
			$rootScope.menuItems.push(mockMenuItem);
			// run through function
			RouteStateSvc.setActiveState(mockMenuItem.state);
			// mock menu item should be set active
			expect(mockMenuItem.active).toBeTruthy();
		});
	});

	describe('setAllStatesInactive function', function() {
		it('should exist', function() {
			expect(RouteStateSvc.setAllStatesInactive).toBeDefined();
		});

		describe('menu item "logout"', function() {
			it('should be active', function() {
				expect($rootScope.menuItems[2]).toBeTruthy();
			});
		});

		it('should set all menu items inactive', function() {
			RouteStateSvc.setAllStatesInactive();
			for (var i=0; i<$rootScope.menuItems.length; i++) {
				expect($rootScope.menuItems[i].active).toBeFalsy();
			}
		});
	});
});




