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
	data() {
		return {
			scriptsArray: [],
			angular: null,
			bootElement: null,
		};
	},
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
			// Only use the non script part and remove ng-app attr
			// to avoid auto bootstrapping
			return this.markup.split('<script')[0].replace('ng-app="formEditor"', '');
		},
	},
	mounted() {
		/**
		 * Webpack code split
		 * Ensure that angular + formEditor js has own webpack bundle that
		 * will be loaded async on component created life cycle hook
		*/
		require
			.ensure(['flatpickr', 'flatpickr/dist/l10n/da.js'], (require) => {
				const { da } = require('flatpickr/dist/l10n/da.js').default;

				window.Flatpickr = require('flatpickr');
				window.Flatpickr.localize(da); // default locale is now danish

				this.$set(this, 'angular', require('angular'));

				require('./formEditor/FormEditorAsync.js');
				require('./flatpickr/flatpickr.directive.js');
			}, 'formEditor')
			// scripts must be inserted before form html, since the html uses a function from scripts on mount.
			.then(this.insertScripts)
			.then(() => {
				// Insert form markup and bootstrap angular
				this.$el.innerHTML = this.contentHtml;

				this.bootElement = this.$refs.wrap.children[0];
				this.angular.bootstrap(this.bootElement, ['formEditor']);
			});
	},
	beforeDestroy() {
		// Remove added scripts, hence avoiding clutting the body with exessive  scripts
		const fp = [...document.querySelectorAll('.flatpickr-calendar.animate')];
		this.scriptsArray = [...this.scriptsArray, ...fp];

		this.scriptsArray.forEach((element) => {
			element.parentNode.removeChild(element);
		});
	},
	methods: {
		insertScripts() {
			this.formScripts.forEach((script, index) => {
				const scriptElement = document.createElement('script');
				this.scriptsArray.push(scriptElement);

				scriptElement.setAttribute('id', `formEditorScript-${index + 1}`);
				scriptElement.innerHTML = script;

				// script must be appended outside the vue instance - if not it will be stripped from DOM by vue
				document.body.appendChild(scriptElement);
			});
		},
	},
};