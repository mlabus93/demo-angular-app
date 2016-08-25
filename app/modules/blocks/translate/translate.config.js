(function() {
	'use strict';

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