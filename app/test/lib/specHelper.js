var SpecHelper = (function() {
	var service = {
		deferRouterIntercept: deferRouterIntercept,
		fakeTranslator: fakeTranslator,
		verifyNoOutstandingHttpRequests: verifyNoOutstandingHttpRequests
	}
	return service;

	function deferRouterIntercept() {
		beforeEach(module(function($urlRouterProvider) {
			$urlRouterProvider.deferIntercept();
		}));
	}

	function fakeTranslator($provide, $translateProvider) {
		$provide.factory('customLoader', function ($q) {
			return function () {
				var deferred = $q.defer();
				deferred.resolve({});
				return deferred.promise;
			};
		});
		$translateProvider.useLoader('customLoader');
	}

	function verifyNoOutstandingHttpRequests() {
		afterEach(inject(function($httpBackend) {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		}));
	}
})();