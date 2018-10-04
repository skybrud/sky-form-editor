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
	data: function data() {
		return {
			scriptsArray: [],
			angular: null,
			bootElement: null,
		};
	},
	computed: {
		formScripts: function formScripts() {
			var this$1 = this;

			// Extract all scripts from the markup input
			var scripts = [];
			var regex = /<script[^>]*>([\s\S]*?)<\/script>/g;

			if (this.markup.match(regex)) {
				for (var i = this.markup.match(regex).length; i > 0; i--) {
					scripts.push(regex.exec(this$1.markup)[1]);
				}
			}

			return scripts;
		},
		contentHtml: function contentHtml() {
			// Only use the non script part and remove ng-app attr
			// to avoid auto bootstrapping
			return this.markup.split('<script')[0].replace('ng-app="formEditor"', '');
		},
	},
	mounted: function mounted() {
		var this$1 = this;

		/**
		 * Webpack code split
		 * Ensure that angular + formEditor js has own webpack bundle that
		 * will be loaded async on component created life cycle hook
		*/
		require
			.ensure(['flatpickr', 'flatpickr/dist/l10n/da.js'], function (require) {
				var ref = require('flatpickr/dist/l10n/da.js').default;
				var da = ref.da;

				window.Flatpickr = require('flatpickr');
				window.Flatpickr.localize(da); // default locale is now danish

				this$1.$set(this$1, 'angular', require('angular'));

				require('./formEditor/FormEditorAsync.js');
				require('./flatpickr/flatpickr.directive.js');
			}, 'formEditor')
			// scripts must be inserted before form html, since the html uses a function from scripts on mount.
			.then(this.insertScripts)
			.then(function () {
				// Insert form markup and bootstrap angular
				this$1.$el.innerHTML = this$1.contentHtml;

				this$1.bootElement = this$1.$refs.wrap.children[0];
				this$1.angular.bootstrap(this$1.bootElement, ['formEditor']);
			});
	},
	beforeDestroy: function beforeDestroy() {
		// Remove added scripts, hence avoiding clutting the body with exessive  scripts
		var fp = [].concat( document.querySelectorAll('.flatpickr-calendar.animate') );
		this.scriptsArray = this.scriptsArray.concat( fp);

		this.scriptsArray.forEach(function (element) {
			element.parentNode.removeChild(element);
		});
	},
	methods: {
		insertScripts: function insertScripts() {
			var this$1 = this;

			this.formScripts.forEach(function (script, index) {
				var scriptElement = document.createElement('script');
				this$1.scriptsArray.push(scriptElement);

				scriptElement.setAttribute('id', ("formEditorScript-" + (index + 1)));
				scriptElement.innerHTML = script;

				// script must be appended outside the vue instance - if not it will be stripped from DOM by vue
				document.body.appendChild(scriptElement);
			});
		},
	},
};

/* script */
            var __vue_script__ = script;
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)};
var __vue_staticRenderFns__ = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sky-form-editor"},[_c('div',{pre:true,attrs:{"class":"sky-form-editor-wrap"}})])}];

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "SkyFormEditor.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
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

var defaults = {
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

	var ref = Object.assign({}, defaults, options);
	var registerComponents = ref.registerComponents;

	if (registerComponents) {
		Vue.component(SkyFormEditor.name, SkyFormEditor);
	}
}

export default install;
export { SkyFormEditor };
