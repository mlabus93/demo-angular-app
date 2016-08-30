(function() {
	'use strict';

	angular
		.module('blocks.router')
		.config(RoutesConfig)
		.run(run);

	RoutesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelperProvider'];
	function RoutesConfig($stateProvider, $locationProvider, $urlRouterProvider, RouteHelper) {

		$locationProvider.html5Mode(false);

		$urlRouterProvider.otherwise('/app/home');

		$stateProvider
			.state('app', {
				url: '/app',
				templateUrl: RouteHelper.config.basepath('layout/app.html'),
				abstract: true
			})
			.state('app.main', {
				views: {
					'header': {
						templateUrl: RouteHelper.config.basepath('layout/header.html'),
						controller: 'HeaderCtrl',
						controllerAs: 'HeaderCtrl'
					},
					'navbar': {
						templateUrl: RouteHelper.config.basepath('layout/navbar.html'),
						controller: 'NavbarCtrl',
						controllerAs: 'NavbarCtrl'
					},
					'footer': {
						templateUrl: RouteHelper.config.basepath('layout/footer.html')
					},
					'content': {
						templateUrl: RouteHelper.config.basepath('layout/content.html')
					}
				}
			})
			.state('app.main.home', {
				url: '/home',
				templateUrl: RouteHelper.config.basepath('home/home.html'),
				controller: 'HomeCtrl',
				controllerAs: 'HomeCtrl'
			})
			.state('app.main.reports', {
				url: '/reports',
				templateUrl: RouteHelper.config.basepath('reports/reports.html')
			})
			.state('app.main.analytics', {
				url: '/analytics',
				templateUrl: RouteHelper.config.basepath('analytics/analytics.html'),
				abstract: true
			})
			.state('app.main.analytics.graphs', {
				url: '/graphs',
				templateUrl: RouteHelper.config.basepath('analytics/analyticsGraphs.html')
			})
			.state('app.main.analytics.tables', {
				url: '/tables',
				templateUrl: RouteHelper.config.basepath('analytics/analyticsTable.html'),
				controller: 'AnalyticsTableCtrl',
				controllerAs: 'AnalyticsTableCtrl',
				resolve: RouteHelper.config.resolveFor('ngTable')
			})
			;
	}

	run.$inject = ['$rootScope', '$window', 'LoggerSvc', '$location', '$state', 'RouteStateSvc'];
	function run($rootScope, $window, LoggerSvc, $location, $state, RouteStateSvc) {
		var handlingRoutingError = false;

		$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
			if (handlingRoutingError) {
				return;
			}
			handlingRoutingError = true;
			var message = 'Error routing to ' + toState + '. Error: ' + error;
			LoggerSvc.warning(message, fromState);
			$location.path('/');
		});

		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
			handlingRoutingError = false;
			if ($rootScope.menuItems) {
				RouteStateSvc.setActiveState(toState.name);
			}
		});
	}
})();