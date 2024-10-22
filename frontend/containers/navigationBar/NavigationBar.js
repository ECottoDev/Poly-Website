/**
* NavigationBar.js
*
* @author Edwin Cotto <edtowers1037@gmail.com>
* @copyright Edwin Cotto, All rights reserved.
*
* @version 2024-February-03 initial version
*/

import { addClasses, addEvent, appendChildren, detachChildren, createElementContainer, createHeadingText, createImgButton, createSVGButton } from "../../../helpers/basicElements.js";
import { routes } from "../../../helpers/router.js";

export class NavigationBar {
    constructor(parentProps) {
        this.parentProps = parentProps;
        this.view = addClasses(createElementContainer(), 'navigationBar_view');
        this.setView();
    }
    setView() {
        appendChildren(this.view, [
            addEvent(addClasses(createImgButton('frontend/assets/images/polytechnicLogo.png', { title: 'PUPR Logo', hover: false }), 'navigationBar_logo'), () => { this.parentProps.setNavState(routes.HOME_VIEW) }),
        ]);
    }
}
