'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
			// Only use the non script part.
			return this.markup.split('<script')[0];
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
			.ensure(['angular', 'flatpickr', 'flatpickr/dist/l10n/da.js'], function (require) {
				var ref = require('flatpickr/dist/l10n/da.js').default;
				var da = ref.da;

				window.Flatpickr = require('flatpickr');
				window.Flatpickr.localize(da); // default locale is now danish

				require('angular');
				require('../src/formEditor/FormEditorAsync.js');
				require('../src/flatpickr/flatpickr.directive.js');
			}, 'formEditor')
			.then(function () {
				// scripts must be inserted before form html, since the html uses a function from scripts on mount.
				this$1.insertScripts();
			})
			.then(function () {
				this$1.$el.innerHTML = this$1.contentHtml;
			});
	},
	methods: {
		insertScripts: function insertScripts() {
			this.formScripts.forEach(function (script) {
				var scriptElement = document.createElement('script');
				scriptElement.setAttribute('id', ("formEditorScript-" + (Math.random().toString(35).substr(2, 5))));
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
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sky-form-editor"},[_vm._ssrNode("<div class=\"sky-form-editor-wrap\"></div>")])};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-42618066_0", { source: "\n.flatpickr-calendar{background:0 0;overflow:hidden;max-height:0;opacity:0;visibility:hidden;text-align:center;padding:0;-webkit-animation:none;animation:none;direction:ltr;border:0;font-size:14px;line-height:24px;border-radius:0;position:absolute;width:315px;box-sizing:border-box;-ms-touch-action:manipulation;touch-action:manipulation;background:#fff;box-shadow:1px 0 0 #e6e6e6,-1px 0 0 #e6e6e6,0 1px 0 #e6e6e6,0 -1px 0 #e6e6e6,0 3px 13px rgba(0,0,0,.08)\n}\n.flatpickr-calendar.inline,.flatpickr-calendar.open{opacity:1;visibility:visible;overflow:visible;max-height:640px\n}\n.flatpickr-calendar.open{display:inline-block;z-index:99999\n}\n.flatpickr-calendar.animate.open{-webkit-animation:fpFadeInDown .3s cubic-bezier(.23,1,.32,1);animation:fpFadeInDown .3s cubic-bezier(.23,1,.32,1)\n}\n.flatpickr-calendar.inline{display:block;position:relative;top:2px\n}\n.flatpickr-calendar.static{position:absolute;top:calc(100% + 2px)\n}\n.flatpickr-calendar.static.open{z-index:999;display:block\n}\n.flatpickr-calendar.hasWeeks{width:auto\n}\n.flatpickr-calendar .hasTime .dayContainer,.flatpickr-calendar .hasWeeks .dayContainer{border-bottom:0;border-bottom-right-radius:0;border-bottom-left-radius:0\n}\n.flatpickr-calendar .hasWeeks .dayContainer{border-left:0\n}\n.flatpickr-calendar.showTimeInput.hasTime .flatpickr-time{height:40px;border-top:1px solid #e6e6e6\n}\n.flatpickr-calendar.noCalendar.hasTime .flatpickr-time{height:auto\n}\n.flatpickr-calendar:after,.flatpickr-calendar:before{position:absolute;display:block;pointer-events:none;border:solid transparent;content:'';height:0;width:0;left:22px\n}\n.flatpickr-calendar.rightMost:after,.flatpickr-calendar.rightMost:before{left:auto;right:22px\n}\n.flatpickr-calendar:before{border-width:5px;margin:0 -5px\n}\n.flatpickr-calendar:after{border-width:4px;margin:0 -4px\n}\n.flatpickr-calendar.arrowTop:after,.flatpickr-calendar.arrowTop:before{bottom:100%\n}\n.flatpickr-calendar.arrowTop:before{border-bottom-color:#e6e6e6\n}\n.flatpickr-calendar.arrowTop:after{border-bottom-color:#fff\n}\n.flatpickr-calendar.arrowBottom:after,.flatpickr-calendar.arrowBottom:before{top:100%\n}\n.flatpickr-calendar.arrowBottom:before{border-top-color:#e6e6e6\n}\n.flatpickr-calendar.arrowBottom:after{border-top-color:#fff\n}\n.flatpickr-calendar:focus{outline:0\n}\n.flatpickr-wrapper{position:relative;display:inline-block\n}\n.flatpickr-month{background:0 0;color:rgba(0,0,0,.9);fill:rgba(0,0,0,.9);height:28px;line-height:1;text-align:center;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden\n}\n.flatpickr-next-month,.flatpickr-prev-month{text-decoration:none;cursor:pointer;position:absolute;top:0;line-height:16px;height:28px;padding:10px calc(3.57% - 1.5px);z-index:3\n}\n.flatpickr-next-month i,.flatpickr-prev-month i{position:relative\n}\n.flatpickr-next-month.flatpickr-prev-month,.flatpickr-prev-month.flatpickr-prev-month{left:0\n}\n.flatpickr-next-month.flatpickr-next-month,.flatpickr-prev-month.flatpickr-next-month{right:0\n}\n.flatpickr-next-month:hover,.flatpickr-prev-month:hover{color:#959ea9\n}\n.flatpickr-next-month:hover svg,.flatpickr-prev-month:hover svg{fill:#f64747\n}\n.flatpickr-next-month svg,.flatpickr-prev-month svg{width:14px\n}\n.flatpickr-next-month svg path,.flatpickr-prev-month svg path{transition:fill .1s;fill:inherit\n}\n.numInputWrapper{position:relative;height:auto\n}\n.numInputWrapper input,.numInputWrapper span{display:inline-block\n}\n.numInputWrapper input{width:100%\n}\n.numInputWrapper span{position:absolute;right:0;width:14px;padding:0 4px 0 2px;height:50%;line-height:50%;opacity:0;cursor:pointer;border:1px solid rgba(57,57,57,.05);box-sizing:border-box\n}\n.numInputWrapper span:hover{background:rgba(0,0,0,.1)\n}\n.numInputWrapper span:active{background:rgba(0,0,0,.2)\n}\n.numInputWrapper span:after{display:block;content:\"\";position:absolute;top:33%\n}\n.numInputWrapper span.arrowUp{top:0;border-bottom:0\n}\n.numInputWrapper span.arrowUp:after{border-left:4px solid transparent;border-right:4px solid transparent;border-bottom:4px solid rgba(57,57,57,.6)\n}\n.numInputWrapper span.arrowDown{top:50%\n}\n.numInputWrapper span.arrowDown:after{border-left:4px solid transparent;border-right:4px solid transparent;border-top:4px solid rgba(57,57,57,.6)\n}\n.numInputWrapper span svg{width:inherit;height:auto\n}\n.numInputWrapper span svg path{fill:rgba(0,0,0,.5)\n}\n.numInputWrapper:hover{background:rgba(0,0,0,.05)\n}\n.numInputWrapper:hover span{opacity:1\n}\n.flatpickr-current-month{font-size:135%;line-height:inherit;font-weight:300;color:inherit;position:absolute;width:75%;left:12.5%;padding:6.16px 0 0 0;line-height:1;height:28px;display:inline-block;text-align:center;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)\n}\n.flatpickr-current-month.slideLeft{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0);-webkit-animation:fpFadeOut .4s ease,fpSlideLeft .4s cubic-bezier(.23,1,.32,1);animation:fpFadeOut .4s ease,fpSlideLeft .4s cubic-bezier(.23,1,.32,1)\n}\n.flatpickr-current-month.slideLeftNew{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0);-webkit-animation:fpFadeIn .4s ease,fpSlideLeftNew .4s cubic-bezier(.23,1,.32,1);animation:fpFadeIn .4s ease,fpSlideLeftNew .4s cubic-bezier(.23,1,.32,1)\n}\n.flatpickr-current-month.slideRight{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0);-webkit-animation:fpFadeOut .4s ease,fpSlideRight .4s cubic-bezier(.23,1,.32,1);animation:fpFadeOut .4s ease,fpSlideRight .4s cubic-bezier(.23,1,.32,1)\n}\n.flatpickr-current-month.slideRightNew{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);-webkit-animation:fpFadeIn .4s ease,fpSlideRightNew .4s cubic-bezier(.23,1,.32,1);animation:fpFadeIn .4s ease,fpSlideRightNew .4s cubic-bezier(.23,1,.32,1)\n}\n.flatpickr-current-month span.cur-month{font-family:inherit;font-weight:700;color:inherit;display:inline-block;margin-left:.5ch;padding:0\n}\n.flatpickr-current-month span.cur-month:hover{background:rgba(0,0,0,.05)\n}\n.flatpickr-current-month .numInputWrapper{width:6ch;width:7ch\\0;display:inline-block\n}\n.flatpickr-current-month .numInputWrapper span.arrowUp:after{border-bottom-color:rgba(0,0,0,.9)\n}\n.flatpickr-current-month .numInputWrapper span.arrowDown:after{border-top-color:rgba(0,0,0,.9)\n}\n.flatpickr-current-month input.cur-year{background:0 0;box-sizing:border-box;color:inherit;cursor:default;padding:0 0 0 .5ch;margin:0;display:inline-block;font-size:inherit;font-family:inherit;font-weight:300;line-height:inherit;height:initial;border:0;border-radius:0;vertical-align:initial\n}\n.flatpickr-current-month input.cur-year:focus{outline:0\n}\n.flatpickr-current-month input.cur-year[disabled],.flatpickr-current-month input.cur-year[disabled]:hover{font-size:100%;color:rgba(0,0,0,.5);background:0 0;pointer-events:none\n}\n.flatpickr-weekdays{background:0 0;text-align:center;overflow:hidden;width:315px;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:28px\n}\n.flatpickr-weekdaycontainer{background:0 0;text-align:center;overflow:hidden;width:100%;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:100%\n}\nspan.flatpickr-weekday{cursor:default;font-size:90%;background:0 0;color:rgba(0,0,0,.54);line-height:1;margin:0;text-align:center;display:block;-webkit-flex:1;-ms-flex:1;flex:1;font-weight:bolder\n}\n.dayContainer,.flatpickr-weeks{padding:1px 0 0 0\n}\n.flatpickr-days{position:relative;overflow:hidden;display:-webkit-flex;display:-ms-flexbox;display:flex;width:315px\n}\n.flatpickr-days:focus{outline:0\n}\n.dayContainer{padding:0;outline:0;text-align:left;width:315px;min-width:315px;max-width:315px;box-sizing:border-box;display:inline-block;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-wrap:wrap;-ms-flex-pack:justify;-webkit-justify-content:space-around;justify-content:space-around;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);opacity:1\n}\n.flatpickr-calendar.animate .dayContainer.slideLeft{-webkit-animation:fpFadeOut .4s cubic-bezier(.23,1,.32,1),fpSlideLeft .4s cubic-bezier(.23,1,.32,1);animation:fpFadeOut .4s cubic-bezier(.23,1,.32,1),fpSlideLeft .4s cubic-bezier(.23,1,.32,1)\n}\n.flatpickr-calendar.animate .dayContainer.slideLeft,.flatpickr-calendar.animate .dayContainer.slideLeftNew{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)\n}\n.flatpickr-calendar.animate .dayContainer.slideLeftNew{-webkit-animation:fpFadeIn .4s cubic-bezier(.23,1,.32,1),fpSlideLeft .4s cubic-bezier(.23,1,.32,1);animation:fpFadeIn .4s cubic-bezier(.23,1,.32,1),fpSlideLeft .4s cubic-bezier(.23,1,.32,1)\n}\n.flatpickr-calendar.animate .dayContainer.slideRight{-webkit-animation:fpFadeOut .4s cubic-bezier(.23,1,.32,1),fpSlideRight .4s cubic-bezier(.23,1,.32,1);animation:fpFadeOut .4s cubic-bezier(.23,1,.32,1),fpSlideRight .4s cubic-bezier(.23,1,.32,1);-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)\n}\n.flatpickr-calendar.animate .dayContainer.slideRightNew{-webkit-animation:fpFadeIn .4s cubic-bezier(.23,1,.32,1),fpSlideRightNew .4s cubic-bezier(.23,1,.32,1);animation:fpFadeIn .4s cubic-bezier(.23,1,.32,1),fpSlideRightNew .4s cubic-bezier(.23,1,.32,1)\n}\n.flatpickr-day{background:0 0;border:1px solid transparent;border-radius:150px;box-sizing:border-box;color:#393939;cursor:pointer;font-weight:400;width:14.2857143%;-webkit-flex-basis:14.2857143%;-ms-flex-preferred-size:14.2857143%;flex-basis:14.2857143%;max-width:40px;height:40px;line-height:40px;margin:0;display:inline-block;position:relative;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;text-align:center\n}\n.flatpickr-day.inRange,.flatpickr-day.nextMonthDay.inRange,.flatpickr-day.nextMonthDay.today.inRange,.flatpickr-day.nextMonthDay:focus,.flatpickr-day.nextMonthDay:hover,.flatpickr-day.prevMonthDay.inRange,.flatpickr-day.prevMonthDay.today.inRange,.flatpickr-day.prevMonthDay:focus,.flatpickr-day.prevMonthDay:hover,.flatpickr-day.today.inRange,.flatpickr-day:focus,.flatpickr-day:hover{cursor:pointer;outline:0;background:#e6e6e6;border-color:#e6e6e6\n}\n.flatpickr-day.today{border-color:#959ea9\n}\n.flatpickr-day.today:focus,.flatpickr-day.today:hover{border-color:#959ea9;background:#959ea9;color:#fff\n}\n.flatpickr-day.endRange,.flatpickr-day.endRange.inRange,.flatpickr-day.endRange.nextMonthDay,.flatpickr-day.endRange.prevMonthDay,.flatpickr-day.endRange:focus,.flatpickr-day.endRange:hover,.flatpickr-day.selected,.flatpickr-day.selected.inRange,.flatpickr-day.selected.nextMonthDay,.flatpickr-day.selected.prevMonthDay,.flatpickr-day.selected:focus,.flatpickr-day.selected:hover,.flatpickr-day.startRange,.flatpickr-day.startRange.inRange,.flatpickr-day.startRange.nextMonthDay,.flatpickr-day.startRange.prevMonthDay,.flatpickr-day.startRange:focus,.flatpickr-day.startRange:hover{background:#00f;box-shadow:none;color:#fff;border-color:#00f\n}\n.flatpickr-day.endRange.startRange,.flatpickr-day.selected.startRange,.flatpickr-day.startRange.startRange{border-radius:50px 0 0 50px\n}\n.flatpickr-day.endRange.endRange,.flatpickr-day.selected.endRange,.flatpickr-day.startRange.endRange{border-radius:0 50px 50px 0\n}\n.flatpickr-day.endRange.startRange+.endRange,.flatpickr-day.selected.startRange+.endRange,.flatpickr-day.startRange.startRange+.endRange{box-shadow:-10px 0 0 #00f\n}\n.flatpickr-day.endRange.startRange.endRange,.flatpickr-day.selected.startRange.endRange,.flatpickr-day.startRange.startRange.endRange{border-radius:50px\n}\n.flatpickr-day.inRange{border-radius:0;box-shadow:-5px 0 0 #e6e6e6,5px 0 0 #e6e6e6\n}\n.flatpickr-day.disabled,.flatpickr-day.disabled:hover{pointer-events:none\n}\n.flatpickr-day.disabled,.flatpickr-day.disabled:hover,.flatpickr-day.nextMonthDay,.flatpickr-day.notAllowed,.flatpickr-day.notAllowed.nextMonthDay,.flatpickr-day.notAllowed.prevMonthDay,.flatpickr-day.prevMonthDay{color:rgba(57,57,57,.3);background:0 0;border-color:transparent;cursor:default\n}\n.flatpickr-day.week.selected{border-radius:0;box-shadow:-5px 0 0 #00f,5px 0 0 #00f\n}\n.rangeMode .flatpickr-day{margin-top:1px\n}\n.flatpickr-weekwrapper{display:inline-block;float:left\n}\n.flatpickr-weekwrapper .flatpickr-weeks{padding:0 12px;box-shadow:1px 0 0 #e6e6e6\n}\n.flatpickr-weekwrapper .flatpickr-weekday{float:none;width:100%;line-height:28px\n}\n.flatpickr-weekwrapper span.flatpickr-day{display:block;width:100%;max-width:none\n}\n.flatpickr-innerContainer{display:block;display:-webkit-flex;display:-ms-flexbox;display:flex;box-sizing:border-box;overflow:hidden\n}\n.flatpickr-rContainer{display:inline-block;padding:0;box-sizing:border-box\n}\n.flatpickr-time{text-align:center;outline:0;display:block;height:0;line-height:40px;max-height:40px;box-sizing:border-box;overflow:hidden;display:-webkit-flex;display:-ms-flexbox;display:flex\n}\n.flatpickr-time:after{content:\"\";display:table;clear:both\n}\n.flatpickr-time .numInputWrapper{-webkit-flex:1;-ms-flex:1;flex:1;width:40%;height:40px;float:left\n}\n.flatpickr-time .numInputWrapper span.arrowUp:after{border-bottom-color:#393939\n}\n.flatpickr-time .numInputWrapper span.arrowDown:after{border-top-color:#393939\n}\n.flatpickr-time.hasSeconds .numInputWrapper{width:26%\n}\n.flatpickr-time.time24hr .numInputWrapper{width:49%\n}\n.flatpickr-time input{background:0 0;box-shadow:none;border:0;border-radius:0;text-align:center;margin:0;padding:0;height:inherit;line-height:inherit;cursor:pointer;color:#393939;font-size:14px;position:relative;box-sizing:border-box\n}\n.flatpickr-time input.flatpickr-hour{font-weight:700\n}\n.flatpickr-time input.flatpickr-minute,.flatpickr-time input.flatpickr-second{font-weight:400\n}\n.flatpickr-time input:focus{outline:0;border:0\n}\n.flatpickr-time .flatpickr-am-pm,.flatpickr-time .flatpickr-time-separator{height:inherit;display:inline-block;float:left;line-height:inherit;color:#393939;font-weight:700;width:2%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-align-self:center;-ms-flex-item-align:center;-ms-grid-row-align:center;align-self:center\n}\n.flatpickr-time .flatpickr-am-pm{outline:0;width:18%;cursor:pointer;text-align:center;font-weight:400\n}\n.flatpickr-time .flatpickr-am-pm:focus,.flatpickr-time .flatpickr-am-pm:hover{background:#f0f0f0\n}\n.flatpickr-input[readonly]{cursor:pointer\n}\n@-webkit-keyframes fpFadeInDown{\nfrom{opacity:0;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)\n}\nto{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)\n}\n}\n@keyframes fpFadeInDown{\nfrom{opacity:0;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)\n}\nto{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)\n}\n}\n@-webkit-keyframes fpSlideLeft{\nfrom{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)\n}\nto{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)\n}\n}\n@keyframes fpSlideLeft{\nfrom{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)\n}\nto{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)\n}\n}\n@-webkit-keyframes fpSlideLeftNew{\nfrom{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)\n}\nto{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)\n}\n}\n@keyframes fpSlideLeftNew{\nfrom{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)\n}\nto{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)\n}\n}\n@-webkit-keyframes fpSlideRight{\nfrom{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)\n}\nto{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)\n}\n}\n@keyframes fpSlideRight{\nfrom{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)\n}\nto{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)\n}\n}\n@-webkit-keyframes fpSlideRightNew{\nfrom{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)\n}\nto{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)\n}\n}\n@keyframes fpSlideRightNew{\nfrom{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)\n}\nto{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)\n}\n}\n@-webkit-keyframes fpFadeOut{\nfrom{opacity:1\n}\nto{opacity:0\n}\n}\n@keyframes fpFadeOut{\nfrom{opacity:1\n}\nto{opacity:0\n}\n}\n@-webkit-keyframes fpFadeIn{\nfrom{opacity:0\n}\nto{opacity:1\n}\n}\n@keyframes fpFadeIn{\nfrom{opacity:0\n}\nto{opacity:1\n}\n}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = "data-v-42618066";
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

    {
      var hook;
      {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          var originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  function __vue_create_injector_ssr__(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
      context = __VUE_SSR_CONTEXT__;
    }

    if (!context) { return function () {} }

    if (!context.hasOwnProperty('styles')) {
      Object.defineProperty(context, 'styles', {
        enumerable: true,
        get: function () { return context._styles; }
      });
      context._renderStyles = renderStyles;
    }

    function renderStyles(styles) {
      var css = '';
      for (var i = 0, list = styles; i < list.length; i += 1) {
        var ref = list[i];
        var ids = ref.ids;
        var media = ref.media;
        var parts = ref.parts;

        css +=
          '<style data-vue-ssr-id="' + ids.join(' ') + '"' + (media ? ' media="' + media + '"' : '') + '>'
          + parts.join('\n') +
          '</style>';
      }

      return css
    }

    return function addStyle(id, css) {
      var group = css.media || 'default';
      var style = context._styles[group] || (context._styles[group] = { ids: [], parts: [] });

      if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        var code = css.source;
        style.parts.push(code);
      }
    }
  }

  
  var SkyFormEditor = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    __vue_create_injector_ssr__
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

exports.SkyFormEditor = SkyFormEditor;
exports.default = install;
