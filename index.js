import Vue from 'vue';
import SkyFormEditor from './sky-form-editor';

/**
 * Tell Vue to ignore the form-editor element
 */
Vue.config.ignoredElements.push('form-editor');

/**
 * Move all script tags from form-editor to body element.
 * This will put them outside our vue app, so they do not
 * get parsed/removed by Vue.
 */
const formEditorScriptNodes = document.body.querySelectorAll('form-editor script');
for (let i = formEditorScriptNodes.length - 1; i >= 0; i--) {
	/**
	 * Appending node to other parent moves it
	 */
	document.body.appendChild(formEditorScriptNodes[i]);
}

/**
 * Register main Vue component
 */
Vue.component('sky-form-editor', SkyFormEditor);

/**
 * Export sky-form-editor Vue component for wrapping form-editor element
 */
export default SkyFormEditor;
