/**
* loginView.js
*
* @author Edwin Cotto <edtowers1037@gmail.com>
* @copyright Edwin Cotto, All rights reserved.
*
* @version 2024-February-08 initial version
*/

import { addClasses, addEvent, appendChildren, createButton, createElementContainer, createHeadingText, createInputBar, createPillBox, delayedListener, delayExecution, deleteUsernameCookie, getUsernameCookie, setUsernameCookie } from "../../../helpers/basicElements.js";
import { routes } from "../../../helpers/router.js";
import { systemLogin } from "../../databaseCallers/loginDataCalls.js";


export class LoginView {
    constructor(parentProps) {
        this.parentProps = parentProps;
        this.view = addClasses(createPillBox(), 'loginView_view');
        this.fetch();
    } g
    async fetch() {
        this.setView();
    }
    setView() {
        appendChildren(this.view, [
            addClasses(createHeadingText('Poly login', { bold: true }), 'loginView_heading'),
            this.user = addClasses(createInputBar({ placeholder: 'User' }), 'loginView_userInput'),
            this.password = addEvent(addClasses(createInputBar({ type: 'password', placeholder: 'Password' }), 'loginView_passwordInput'), async () => { if (event.key === 'Enter') { this.login() } }, 'keydown'),
            addEvent(addClasses(createButton('Ingresar'), 'loginView_loginButton'), () => this.login()),

        ])
    }
    async login() {
        await systemLogin(this.user.value, this.password.value,
            () => {
                const close = this.parentProps.displayBox(appendChildren(createPillBox(), [
                    createHeadingText('Login Successfull'),
                    createButton('close'),
                    delayExecution(() => {
                        this.parentProps.setUser(this.user.value);
                        close();
                        delayExecution(this.parentProps.setNavState(routes.PROFESSOR_MANAGEMENT), 1000);
                    }, 1000)])
                )
            },
            () => {
                const close = this.parentProps.displayBox(appendChildren(createPillBox(), [
                    createHeadingText('Login failed. Please check user and password and try again.'),
                    addEvent(createButton('close'), () => close())
                ]))
            })
    }
}
