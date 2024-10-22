
import { addClasses, addEvent, appendChildren, createButton, createElementContainer, createHeadingText, createImg, createInputBar, createSVG, createSVGButton, createScrollArea, detachChildren, getURLParam, getUsernameCookie, navigate, parseRequestURL, setUsernameCookie, toPhoneFormat } from "../helpers/basicElements.js";
import { routes } from "../helpers/router.js";
import { DisplayBox } from "./components/displayBox/DisplayBox.js";
import { EditableBookArray } from "./components/editableBookArray/EditableBookArray.js";
import { NavigationBar } from "./containers/navigationBar/NavigationBar.js";
import { verifySession } from "./databaseCallers/loginDataCalls.js";
import { LoginView } from "./views/loginView/LoginView.js";
import { ProfessorRoster } from "./views/ProfessorRoster/ProfessorRoster.js";
import { ProfessorManagement } from "./views/professorsManagement/ProfessorManagement.js";



window.onload = async () => { appendChildren(document.getElementById('root'), [new Index().view]); }

export class Index {
    constructor() {
        window.onhashchange = () => { this.setNavState() };
        const root = document.getElementById('root');
        this.displayBox = new DisplayBox(root);
        this.setNavObj();
        this.setAppProps();
        // this.newArray = new EditableArray(this.appProps, ['item1', 'item2', 'item3']);

        this.container = addClasses(createScrollArea(), 'index_container');
        this.view = addClasses(createElementContainer(), 'index_view');
        this.setView();
    }
    setAppProps() {
        const root = document.getElementById('root');
        //if any problems arise with the appProps, add {}, before the swirly brackets
        this.appProps = Object.assign({
            setUser: setUsernameCookie.bind(this),
            username: () => getUsernameCookie(),
            displayBox: this.displayBox.display,
            setNavState: this.setNavState.bind(this),
            showMsg: () => { console.log('display showMessage'); }
        });
    }
    async setView() {
        appendChildren(detachChildren(this.view), [
            appendChildren(addClasses(createElementContainer(), 'index_navBarContainer'), [
                this.navBar = addClasses(new NavigationBar(this.appProps).view, 'index_navBar'),
            ]),
            // addClasses(this.newArray.view, 'index_newArray'),
            // addEvent(createButton('add'), () => this.newArray.addInput()),
            // addEvent(createButton('remove'), () => this.newArray.removeLastEmptyInput()),
            // addEvent(createButton('array'), () => this.newArray.getUpdatedArray()),
            this.container,
        ]);
        this.setNavState(this.navState, this.setParams());
    }
    /**
     * helps to set the navigation object and move from pages
     */
    setNavObj() {
        this.navigation = {
            [routes.HOME_VIEW]: () => new ProfessorRoster(this.appProps).view,
            [routes.LOGIN]: () => new LoginView(this.appProps).view,
            [routes.PROFESSOR_MANAGEMENT]: () => new ProfessorManagement(this.appProps).view,
        }
    }
    /**
     * helps to direct the user to another page
     * @param {*} hash 
     * @param {*} params (default = false) 
     */
    async setNavState(hash = '', params = false) {
        hash && navigate(hash, params);
        this.navState = parseRequestURL().split('?')[0];
        const verify = await verifySession(this.appProps.username());

        if (!verify.success && this.navState !== routes.LOGIN) {
            this.navState = routes.HOME_VIEW;
        } else if (this.navState === '' || this.navState === '#/' || this.navState === '/') {
            this.navState = routes.HOME_VIEW;
        } else if (this.navState !== routes.LOGIN && !this.navigation[this.navState]) {
            this.navState = routes.HOME_VIEW; // fallback to HOME_VIEW if route is invalid
        } else if (!verify.success && this.navState === routes.LOGIN) {
            this.navState = routes.LOGIN;
        }
        else if (verify.success && this.navigation[this.navState]) {
            navigate(this.navState); // Single navigation call
        }
        navigate(this.navState); // Single navigation call
        const navView = this.navigation[this.navState] ? this.navigation[this.navState]() : false;
        if (navView) {
            appendChildren(detachChildren(this.container), navView);
        }
    }
    /**
     * helps to get the params to the url
     */
    setParams() {
        const URLParams = getURLParam();
        return URLParams.success ? URLParams.urlParam : false;
    }
}

