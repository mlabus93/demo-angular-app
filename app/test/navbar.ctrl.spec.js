describe('NavbarCtrl', function() {

	var $controller, NavbarSvc, vm, $scope, $q, $state, deferred;

	beforeEach(module('app.layout', function($provide, $translateProvider) {
		/*
			used to prevent errors from angular translate async loader
			https://angular-translate.github.io/docs/#/guide/22_unit-testing-with-angular-translate
		*/
		SpecHelper.fakeTranslator($provide, $translateProvider);
	}));

	/* 
		used to prevent ui-router 'otherwise' func from executing
		http://stackoverflow.com/questions/23655307/ui-router-interfers-with-httpbackend-unit-test-angular-js/23670198#23670198
	*/
	SpecHelper.deferRouterIntercept();

	beforeEach(inject(function(_$controller_, _$rootScope_, _$q_, _NavbarSvc_, _$state_) {
		$q = _$q_;
		$scope = _$rootScope_.$new();
		NavbarSvc = _NavbarSvc_;
		$state = _$state_;
		deferred = _$q_.defer();

		spyOn(NavbarSvc, 'getMenu').and.returnValue(deferred.promise);
		spyOn($state, 'go');

		/*
			below function resolves promise before tests are ran instead of during 'it' block
		*/
		// spyOn(NavbarSvc, 'getMenu').and.callFake(function() {
		// 	var deferred = $q.defer();
		// 	var items = [
		// 			{
		// 				displayName: "Menu Item 1",
		// 				state: "app.state1"
		// 			},
		// 			{
		// 				displayName: "Menu Item 2",
		// 				state: "app.state2"
		// 			},
		// 			{
		// 				displayName: "Dashboard",
		// 				state: "app.dashboard"
		// 			}
		// 		];
		// 	deferred.resolve(items);
		// 	return deferred.promise;
		// });
		// $scope.$apply();

		$controller = _$controller_;

		vm = $controller('NavbarCtrl', {
			$scope: $scope,
			NavbarSvc: NavbarSvc
		});
	}));

	it('should be defined', function() {
		expect(vm).toBeDefined();
	});

	it('should have 2 menu items', function() {

		deferred.resolve([{displayName: 'test', state: 'test'}, {displayName: 'dashboard', state: 'app.dashboard'}]);
		$scope.$apply();

		expect(vm.items.length).toEqual(2);
	});

	it('should reject the promise and have no menu items', function() {
		deferred.reject();

		$scope.$apply();

		expect(vm.items.length).toEqual(0);
	});

	describe('goToState function', function() {
		it('should exist', function() {
			expect(vm.goToState).toBeDefined();
		});

		it('should go to the passed state', function() {
			vm.goToState('app.main.home');
			//$scope.$apply();
			expect($state.go.calls.count()).toEqual(1);
		});
	});

	afterEach(function() {
		$scope.$destroy();
	});
});




