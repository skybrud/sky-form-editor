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
var script = {
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

/* script */
            const __vue_script__ = script;
            
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)};
var __vue_staticRenderFns__ = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sky-form-editor"},[_c('div',{pre:true,attrs:{"class":"sky-form-editor-wrap"}})])}];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "SkyFormEditor.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var SkyFormEditor = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

const defaults = {
	registerComponents: true,
};

function install(Vue, options) {
	if (install.installed === true) {
		return;
	}

	/**
	 * Tell Vue to ignore the form-editor element
	 */
	Vue.config.ignoredElements.push('form-editor');

	const { registerComponents } = Object.assign({}, defaults, options);

	if (registerComponents) {
		Vue.component(SkyFormEditor.name, SkyFormEditor);
	}
}

export default install;
export { SkyFormEditor };
