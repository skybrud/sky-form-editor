<script>
	/**
	 * sky-form-editor component
	 * Has the one purpose of asynchronously loading angular + formEditor js
	 * when the component is created
	 * Slots form-editor element inside itself
	 *
	 * Usage:
	 * 	<sky-form-editor v-cloak>
	 * 		<form-editor v-pre>
	 * 			... formEditor HTML
	 * 		</form-editor>
	 *  </sky-form-editor>
	 *
	 * - Add v-cloak to hide before Vue initiates
	 * - Add v-pre to prevent Vue from trying to parsing angular handlebar bindings
	 *   inside formEditor HTML
	 */
	export default {
		created() {
			/**
			 * Webpack code split
			 * Ensure that angular + formEditor js has own webpack bundle that
			 * will be loaded async on component created life cycle hook
			 */
			require.ensure(['angular', 'flatpickr', 'flatpickr/dist/l10n/da.js'], (require) => {
				window.Flatpickr = require('flatpickr');
				const da = require('flatpickr/dist/l10n/da.js').da;
				window.Flatpickr.localize(da); // default locale is now danish

				require('angular');
				require('./formEditor/FormEditorAsync.js');
				require('./flatpickr/flatpickr.directive.js');
			}, 'formEditor').then(() => {
				/**
				 * Bootstrap all form-editor elements indside component when
				 * angular + formEditor js has loaded
				 */
				const formEditorElements = this.$el.querySelectorAll('form-editor');
				if (formEditorElements && 'angular' in window) {
					for (let i = formEditorElements.length - 1; i >= 0; i--) {
						window.angular.bootstrap(formEditorElements[i], ['formEditor']);
					}
				}
			});
		},
	};
</script>

<template src="./sky-form-editor.html"></template>
