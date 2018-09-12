# sky-form-editor
> Vue module for including FormEditor forms inside Vue app.

For when you _need_ to use the Umbraco module FormEditor inside a Vue.js app.

**And yes**, we know it's far from best practice to bootstrap AngularJS inside Vue, but FormEditor depends upon AngularJS for async posting so here we are. This module tries to go about this in the least ridiculous way by async loading AngularJS and FormEditor in its own script chunk.

Slim Flatpickr AngularJS directive included as well.

## Installation
```bash
npm install sky-form-editor
```
or
```bash
yarn add sky-form-editor
```

## Usage
Begin by importing and installing the SkyMailchimp Vue plugin
```js
import Vue from 'vue';
import SkyFormEditor from 'sky-form-editor';

Vue.use(SkyFormEditor);


# Credits

This module is made by the Frontenders at [skybrud.dk](http://www.skybrud.dk/). Feel free to use it in any way you want. Feedback, questions and bugreports should be posted as issues. Pull-requests appreciated!
