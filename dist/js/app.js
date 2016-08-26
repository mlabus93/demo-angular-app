(function() {
	'use strict';

	angular.module('app', [
		// Shared
		'app.core',
		'app.utils',

		// Features
		'app.analytics',
		'app.home',
		'app.layout',
		'app.reports'
	]);
})();
(function() {
	'use strict';

	angular.module('app.analytics', [
		'app.core'
	]);
})();
(function() {
	'use strict';

	angular.module('app.reports', [
		'app.core'
	]);
})();
(function() {
	'use strict';

	angular.module('app.utils', [
		'app.core'
	]);
})();
(function() {
	'use strict';

	angular.module('app.core', [
		// Angular modules
		//'ngAnimate',
		'ngRoute',
		'oc.lazyLoad',
		'ui.router',
		'pascalprecht.translate',
		//'ngSanitize',
		// Reusable cross app core modules
		'blocks.exception',
		'blocks.logger',
		'blocks.router',
		'blocks.translate'
	]);
})();
(function() {
	'use strict';

	angular.module('blocks.lazyload', []);
})();
(function() {
	'use strict';

	angular.module('app.home', [
		'app.core'
	]);
})();
(function() {
	'use strict';

	angular.module('app.layout', [
		'app.core'
	]);
})();
(function() {
	'use strict';

	angular.module('blocks.exception', [
		'blocks.logger'
	]);
})();
(function() {
	'use strict';

	angular.module('blocks.logger', []);
})();
(function() {
	'use strict';

	angular.module('blocks.translate', []);
})();
(function() {
	'use strict';

	angular.module('blocks.router', [
		'blocks.logger',
		'blocks.lazyload',
		'blocks.exception'
	]);
})();
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
(function() {
	'use strict';

	configure.$inject = ["$logProvider", "$controllerProvider", "$compileProvider", "$filterProvider", "$provide", "exceptionHandlerProvider"];
	var core = angular.module('app.core');

	var config = {
		appErrorPrefix: '[VTS App Error] ',
		appTitle: 'VTS App Demo',
		version: '1.0.0'
	};

	core.config(configure);

	/* @ngInject */
	function configure($logProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, exceptionHandlerProvider) {
		// turn debugging off/on
		if ($logProvider.debugEnabled) {
			$logProvider.debugEnabled(true);
		}

		core.controller = $controllerProvider.register;
		core.directive = $compileProvider.directive;
		core.filter = $filterProvider.register;
		core.factory = $provide.factory;
		core.service = $provide.service;
		core.constant = $provide.constant;
		core.value = $provide.value;

		// Configure common exception handler
		exceptionHandlerProvider.configure(config.appErrorPrefix);
	}
})();
(function() {
	'use strict';

	LazyLoadConfig.$inject = ["$ocLazyLoadProvider", "APP_REQUIRES"];
	angular
		.module('blocks.lazyload')
		.config(LazyLoadConfig);

	/* ngInject */
	function LazyLoadConfig($ocLazyLoadProvider, APP_REQUIRES) {
		// modules configuration
		$ocLazyLoadProvider.config({
			debug: false,
			events: true,
			modules: APP_REQUIRES.modules
		});
	}
})();
(function() {
	'use strict';

	angular
		.module('blocks.lazyload')
		.constant('APP_REQUIRES', {
			// stand-alone scripts go here
			scripts: {
			},
			// angular based scripts
			modules: [
				{name: 'angularTreetable',			files: ['vendor/angular-treetable/dist/angular-treetable.min.js']},
				{name: 'ngTable',					files: ['vendor/ng-table/dist/ng-table.js',
															'vendor/ng-table/dist/ng-table.css']}
			]
		});
})();
(function() {
	'use strict';

	angular
		.module('app.home')
		.controller('HomeCtrl', HomeCtrl);

	HomeCtrl.$inject = ['LoggerSvc'];
	function HomeCtrl(LoggerSvc) {
		var vm = this;

		var defaultHomeInfo = 'This is the home page.';

		vm.homeInfo = defaultHomeInfo;
		vm.resetHomeInfo = resetHomeInfo;
		vm.updateHomeInfo = updateHomeInfo;
		activate();

		function activate() {
			DoStuff();
		}

		function DoStuff() {
			LoggerSvc.info("Home activated...", null);
		}

		function resetHomeInfo() {
			vm.homeInfo = defaultHomeInfo;
			// set input box back to empty on reset
			vm.infoInput = '';
		}

		function updateHomeInfo(inputInfo) {
			vm.homeInfo = inputInfo;
		}
	}
})();
(function() {
	'use strict';

	angular
		.module('app.layout')
		.controller('HeaderCtrl', HeaderCtrl);

	HeaderCtrl.$inject = [];	

	function HeaderCtrl() {
		var vm = this;
	}
})();
(function() {
	'use strict';

	angular
		.module('app.layout')
		.controller('NavbarCtrl', NavbarCtrl);

	NavbarCtrl.$inject = ['$rootScope', '$state', 'NavbarSvc', 'RouteStateSvc'];

	function NavbarCtrl($rootScope, $state, NavbarSvc, RouteStateSvc) {
		var vm = this;

		$rootScope.menuItems = [];
		vm.items= [];

		vm.goToState = goToState;

		activate();

		function activate() {
			return getMenu().then(function() {
				RouteStateSvc.setActiveState($state.current.name);
			});
		}

		function getMenu() {
			return NavbarSvc.getMenu().then(function(data) {
				$rootScope.menuItems = data;
				vm.items = data;
				return vm.items;
			});
		}

		function goToState(state) {
			$state.go(state);
		}
	}
})();
(function() {
	'use strict';

	angular
		.module('app.layout')
		.factory('NavbarSvc', NavbarSvc);

	NavbarSvc.$inject = ['$http', 'ExceptionSvc'];

	function NavbarSvc($http, ExceptionSvc) {
		var service = {
			getMenu: getMenu
		};
		return service;

		function getMenu() {
			return $http.get('/server/menu.json')
				.then(getMenuSuccess)
				.catch(function(error) {
					ExceptionSvc.catcher('XHR failed for getMenu')(error);
				});

			function getMenuSuccess(response) {
				return response.data;
			}
		}
	}
})();
(function() {
	'use strict';

	config.$inject = ["$provide"];
	extendExceptionHandler.$inject = ["$delegate", "exceptionHandler", "LoggerSvc"];
	angular
		.module('blocks.exception')
		.provider('exceptionHandler', exceptionHandlerProvider)
		.config(config);

	function exceptionHandlerProvider() {
		this.config = {
			appErrorPrefix: undefined
		};

		// set error prefix for module configs
		this.configure = function(appErrorPrefix) {
			this.config.appErrorPrefix = appErrorPrefix;
		};

		this.$get = function() {
			return {config: this.config};
		};
	}

	/* ngInject */
	function config($provide) {
		$provide.decorator('$exceptionHandler', extendExceptionHandler);
	}


	// extends base exception handler to use logger service
	function extendExceptionHandler($delegate, exceptionHandler, LoggerSvc) {
		return function(exception, cause) {
			var appErrorPrefix = exceptionHandler.config.appErrorPrefix || '';
			var errorData = {exception: exception, cause: cause};
			exception.message = appErrorPrefix + exception.message;
			$delegate(exception, cause);
			LoggerSvc.error(exception.message, errorData);
		};
	}
})();
(function() {
	'use strict';

	ExceptionSvc.$inject = ["LoggerSvc"];
	angular
		.module('blocks.exception')
		.factory('ExceptionSvc', ExceptionSvc);

	/* ngInject */
	function ExceptionSvc(LoggerSvc) {
		var service = {
			catcher: catcher
		};
		return service;

		function catcher(message) {
			return function(reason) {
				LoggerSvc.error(message, reason);
			};
		}
	}
})();
(function() {
	'use strict';

	LoggerSvc.$inject = ["$log"];
	angular
		.module('blocks.logger')
		.factory('LoggerSvc', LoggerSvc);

	/* ngInject */
	function LoggerSvc($log) {
		var service = {
			error: error,
			info: info,
			success: success,
			warning: warning,
			log: $log.log
		};

		return service;

		function error(message, data, title) {
			$log.error('Error: ' + message, data);
		}

		function info(message, data, title) {
			$log.info('Info: ' + message, data);
		}

		function success(message, data, title) {
			$log.info('Success: ' + message, data);
		}

		function warning(message, data, title) {
			$log.warn('Warning: ' + message, data);
		}
	}
})();
(function() {
	'use strict';

	TranslateConfig.$inject = ["$translateProvider"];
	angular
		.module('blocks.translate')
		.config(TranslateConfig);

	/* ngInject */
	function TranslateConfig($translateProvider) {
		$translateProvider.useStaticFilesLoader({
			prefix: 'dist/i18n/locale-',
			suffix: '.json'
		});

		$translateProvider.preferredLanguage('en_US');

		//$translateProvider.useLocalStorage();

		//$translateProvider.useSanitizeValuesStrategy('escaped');
	}
})();
(function() {
	'use strict';

	angular
		.module('blocks.router')
		.provider('RouteHelper', RouteHelperProvider);

	RouteHelperProvider.$inject = ['APP_REQUIRES'];
	/* ngInject */
	function RouteHelperProvider(APP_REQUIRES) {
		this.config = {
			basepath: basepath,
			resolveFor: resolveFor
		};

		this.$get = function() {
			return {
				config: this.config
			};
		};

		// sets basepath to html views
		function basepath(uri) {
			return 'dist/views/' + uri;
		}

		// resolve dependencies by lazyloading modules and/or functions
		function resolveFor() {
			var modules = arguments;
			return {
				deps: ['$ocLazyLoad', '$q', function($ocLL, $q) {
					// create empty promise
					var promise = $q.when(1);
					// chain promises of modules/functions
					for (var i=0; i<modules.length; i++) {
						promise = andThen(modules[i]);
					}
					return promise;

					function andThen(module) {
						if (typeof module === 'function') {
							return promise.then(module);
						}
						else {
							return promise.then(function() {
								var itemToLoad = getRequired(module);
								if (!itemToLoad) {
									return $.error('Route Resolution Error: Bad name [' + module + ']');
								}
								// lazyload the module
								return $ocLL.load(itemToLoad);
							});
						}
					}
					// gets module objects or scripts
					function getRequired(name) {
						if (APP_REQUIRES.modules) {
							for (var m in APP_REQUIRES.modules) {
								if (APP_REQUIRES.modules[m].name && APP_REQUIRES.modules[m].name === name) {
									return APP_REQUIRES.modules[m];
								}
							}
						}
						return APP_REQUIRES.scripts && APP_REQUIRES.scripts[name];
					}
				}]
			};
		}
	}
})();
(function() {
	'use strict';

	RouteStateSvc.$inject = ["$rootScope"];
	angular
		.module('blocks.router')
		.factory('RouteStateSvc', RouteStateSvc);

	/* ngInject */
	function RouteStateSvc($rootScope) {
		var service = {
			setActiveState: setActiveState,
			setAllStatesInactive: setAllStatesInactive
		};

		return service;

		function setActiveState(state) {
			for (var i=0; i<$rootScope.menuItems.length; i++) {
				// check if state is found
				if ($rootScope.menuItems[i].state === state) {
					$rootScope.menuItems[i].active = true;
				}
				// check if state has submenu state
				else if ($rootScope.menuItems[i].submenu) {
					for (var j=0; j<$rootScope.menuItems[i].submenu.length; j++) {
						// if submenu state is state, activate parent state
						if( $rootScope.menuItems[i].submenu[j].state === state) {
							$rootScope.menuItems[i].active = true;
						}
						// deactivate parent state otherwise
						else {
							$rootScope.menuItems[i].active = false;
						}
					}
				}
				// deactivate state if not current state
				else {
					$rootScope.menuItems[i].active = false;
				}
			}
		}

		function setAllStatesInactive() {
			for (var i=0; i<$rootScope.menuItems.length; i++) {
				$rootScope.menuItems[i].active = false;
			}
		}
	}
})();
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
				templateUrl: RouteHelper.config.basepath('analytics/analytics-graphs.html')
			})
			.state('app.main.analytics.tables', {
				url: '/tables',
				templateUrl: RouteHelper.config.basepath('analytics/analytics-tables.html'),
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