/**
* SearchBar.js
*
* @author Edwin Cotto <cottosoftwaredevelopment@gmail.com>
* @copyright Edwin Cotto, All rights reserved.
*
* @version 2024-May-07 initial version
*/

import { addClasses, appendChildren, createElementContainer, getSearchInput } from "../../../helpers/basicElements.js";


export class SearchBar {
    /**
      * Create a input with an animated placeholder
      * @param {string} placeholder 
      * @param {Function} callback 
      */
    constructor(callback = () => { }, placeholder = 'Buscar') {
        this.placeholder = placeholder;
        this.callback = callback;
        this.view = addClasses(createElementContainer(), 'searchBar__container');
        this.view.tabIndex = 0;
        this.setInput();
    }
    setInput() {
        appendChildren(this.view, this.input = addClasses(getSearchInput(this.callback, this.placeholder), 'searchBar_background'));
    }
    setValue(value = '') {
        this.input.value = value;
        setTimeout(() => {
            this.input.dispatchEvent(new InputEvent('input'));
        })
    }
}