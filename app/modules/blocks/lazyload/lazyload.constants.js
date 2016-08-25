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