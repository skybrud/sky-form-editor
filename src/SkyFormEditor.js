/**
 * sky-form-editor component
 * Has the one purpose of asynchronously loading angular + formEditor js
 * when the component is created
 * Slots form-editor element inside itself
 *
 * Usage:
 * 	<sky-form-editor v-cloak :markup="content.value.htmlAsync" />
 *
 * - Add v-cloak to hide before Vue initiates
 * - Add v-pre to prevent Vue from trying to parsing angular handlebar bindings
 *   inside formEditor HTML
 */
export default {
	name: 'SkyFormEditor',
	props: ['markup'],
	computed: {
		formScripts() {
			// Extract all scripts from the markup input
			const scripts = [];
			const regex = /<script[^>]*>([\s\S]*?)<\/script>/g;

			if (this.markup.match(regex)) {
				for (let i = this.markup.match(regex).length; i > 0; i--) {
					scripts.push(regex.exec(this.markup)[1]);
				}
			}

			return scripts;
		},
		contentHtml() {
			// Only use the non script part.
			return this.markup.split('<script')[0];
		},
	},
	mounted() {
		/**
			 * Webpack code split
			 * Ensure that angular + formEditor js has own webpack bundle that
			 * will be loaded async on component created life cycle hook
			*/
		require
			.ensure(['angular', 'flatpickr', 'flatpickr/dist/l10n/da.js'], (require) => {
				const { da } = require('flatpickr/dist/l10n/da.js').default;

				window.Flatpickr = require('flatpickr');
				window.Flatpickr.localize(da); // default locale is now danish

				require('angular');
				require('../src/formEditor/FormEditorAsync.js');
				require('../src/flatpickr/flatpickr.directive.js');
			}, 'formEditor')
			.then(() => {
				// scripts must be inserted before form html, since the html uses a function from scripts on mount.
				this.insertScripts();
			})
			.then(() => {
				this.$el.innerHTML = this.contentHtml;
			});
	},
	methods: {
		insertScripts() {
			this.formScripts.forEach((script) => {
				const scriptElement = document.createElement('script');
				scriptElement.setAttribute('id', `formEditorScript-${Math.random().toString(35).substr(2, 5)}`);
				scriptElement.innerHTML = script;

				// script must be appended outside the vue instance - if not it will be stripped from DOM by vue
				document.body.appendChild(scriptElement);
			});
		},
	},
};
