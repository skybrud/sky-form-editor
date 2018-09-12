import SkyFormEditor from './SkyFormEditor.vue';

const defaults = {
	registerComponents: true,
};

export { SkyFormEditor };

export default function install(Vue, options) {
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
};