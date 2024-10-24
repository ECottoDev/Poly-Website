
import { addClasses, addEvent, appendChildren, createButton, createElementContainer, createHeadingText, createInputBar, createPillBox, delayExecution, detachChildren, getStringDialogBoxView, toTitleCase } from "../../../helpers/basicElements.js";
import { routes } from "../../../helpers/router.js";
import { verifySession } from "../../databaseCallers/loginDataCalls.js";
import { deleteAdminData, insertAdminData, updateAdminData } from "../../databaseCallers/professorDataCalls.js";



export class AdminMangement {
    constructor(parentProps, close) {
        this.parentProps = parentProps;
        this.close = close;
        this.view = addClasses(createPillBox(), 'adminManagement_view');
        this.setView();
    }
    setView() {
        appendChildren(this.view, [
            addClasses(createHeadingText(toTitleCase('Manejar los credenciales de administradores.')), 'adminManagement_title'),
            appendChildren(addClasses(createElementContainer(), 'adminManagement_buttons'), [
                addEvent(addClasses(createButton('Agregar Administrador'), 'adminManagement_addButton'), () => { this.addAdmin() }),
                addEvent(addClasses(createButton('Editar Administrador'), 'adminManagement_editButton'), () => { this.editAdmin() }),
                addEvent(addClasses(createButton('Eliminar Administrador'), 'adminManagement_deleteButton'), () => { this.deleteAdmin() }),
            ]),
            addEvent(addClasses(createButton('Cerrar'), 'adminManagement_closeButton'), () => { this.close() })
        ]);
    }

    addAdmin() {
        appendChildren(detachChildren(this.view), [
            createHeadingText('Agregar Administrador'),
            this.user = addClasses(createInputBar({ placeholder: 'Nombre de Usuario' }), 'adminManagement_inputBar'),
            this.temp1 = addClasses(createInputBar({ type: 'password', placeholder: 'Contraseña' }), 'adminManagement_inputBar'),
            this.temp2 = addClasses(createInputBar({ type: 'password', placeholder: 'Confirmar Contraseña' }), 'adminManagement_inputBar'),
            appendChildren(addClasses(createElementContainer(), 'adminManagement_buttons'), [
                addEvent(addClasses(createButton('Guardar'), 'adminManagement_saveButton'), async () => {
                    if (this.user.value === 'admin' || this.user.value === 'Admin') {
                        const close = this.parentProps.displayBox(addClasses(getStringDialogBoxView('Error. No se puede crear usuario admin.'), 'adminManagement_errorDialogBox'));
                        delayExecution(() => close(), 2000);
                        return;
                    }
                    if (this.temp1.value !== this.temp2.value) {
                        const close = this.parentProps.displayBox(addClasses(getStringDialogBoxView('Las contraseñas no coinciden.'), 'adminManagement_errorDialogBox'));
                        delayExecution(() => close(), 2000);
                        return;
                    }
                    this.password = this.temp2.value;
                    await insertAdminData(this.user.value, this.password, () => {
                        const close = this.parentProps.displayBox(addClasses(getStringDialogBoxView('Usuario creado exitosamente.'), 'adminManagement_errorDialogBox'));
                        delayExecution(() => close(), 2000);

                        delayExecution(async () => { const verify = await verifySession(this.parentProps.username()); if (verify.success) { detachChildren(this.view); this.setView(); } else { this.parentProps.setNavState(routes.HOME_VIEW); close(); this.close() } }, 2300);
                    }, () => {
                        const close = this.parentProps.displayBox(addClasses(getStringDialogBoxView('Error al crear usuario. Confirmar que el usuario y la contraseña esten correctas.'), 'adminManagement_errorDialogBox'));
                        delayExecution(() => close(), 2000);
                    });
                }),
                addEvent(addClasses(createButton('Cancelar'), 'adminManagement_cancelButton'), () => { detachChildren(this.view); this.setView() }),
            ]),
        ]);
    }

    async editAdmin() {
        appendChildren(detachChildren(this.view), [
            createHeadingText('Editar Administrador'),
            this.user = addClasses(createInputBar({ placeholder: 'Nombre de Usuario' }), 'adminManagement_inputBar'),
            this.temp1 = addClasses(createInputBar({ type: 'password', placeholder: 'Contraseña Nueva' }), 'adminManagement_inputBar'),
            this.temp2 = addClasses(createInputBar({ type: 'password', placeholder: 'Confirmar Contraseña' }), 'adminManagement_inputBar'),
            appendChildren(addClasses(createElementContainer(), 'adminManagement_buttons'), [
                addEvent(addClasses(createButton('Guardar'), 'adminManagement_saveButton'), async () => {
                    if (this.temp1.value !== this.temp2.value) {
                        const close = this.parentProps.displayBox(addClasses(getStringDialogBoxView('Las contraseñas no coinciden.'), 'adminManagement_errorDialogBox'));
                        delayExecution(() => close(), 2000);
                        return;
                    }
                    this.password = this.temp2.value;
                    await updateAdminData(this.user.value, this.password, () => {
                        const close = this.parentProps.displayBox(addClasses(getStringDialogBoxView('Usuario actualizado exitosamente.'), 'adminManagement_errorDialogBox'));
                        delayExecution(() => close(), 2000);
                        delayExecution(async () => { const verify = await verifySession(this.parentProps.username()); if (verify.success) { detachChildren(this.view); this.setView(); } else { this.parentProps.setNavState(routes.HOME_VIEW); close(); this.close() } }, 2300);
                    }, () => {
                        const close = this.parentProps.displayBox(addClasses(getStringDialogBoxView('Error al crear usuario. Confirmar que el usuario y la contraseña esten correctas.'), 'adminManagement_errorDialogBox'));
                        delayExecution(() => close(), 2000);
                    });
                }),
                addEvent(addClasses(createButton('Cancelar'), 'adminManagement_cancelButton'), () => { detachChildren(this.view); this.setView() }),
            ]),
        ]);
    }

    deleteAdmin() {
        appendChildren(detachChildren(this.view), [
            createHeadingText('Eliminar Administrador'),
            this.user = addClasses(createInputBar({ placeholder: 'Nombre de Usuario' }), 'adminManagement_inputBar'),
            appendChildren(addClasses(createElementContainer(), 'adminManagement_buttons'), [
                addEvent(addClasses(createButton('Eliminar'), 'adminManagement_saveButton'), async () => {
                    await deleteAdminData(this.user.value, () => {
                        const close = this.parentProps.displayBox(addClasses(getStringDialogBoxView('Usuario eliminado exitosamente.'), 'adminManagement_errorDialogBox'));
                        delayExecution(() => close(), 2000);
                        delayExecution(async () => { const verify = await verifySession(this.parentProps.username()); if (verify.success) { detachChildren(this.view); this.setView(); } else { this.parentProps.setNavState(routes.HOME_VIEW); close(); this.close() } }, 2300);
                    }, () => {
                        const close = this.parentProps.displayBox(addClasses(getStringDialogBoxView('Error al eliminar usuario. Confirmar que el usuario y la contraseña esten correctas.'), 'adminManagement_errorDialogBox'));
                        delayExecution(() => close(), 2000);
                    }, () => {
                        const close = this.parentProps.displayBox(addClasses(getStringDialogBoxView('Error. Se Intentó eliminar usuario admin.'), 'adminManagement_errorDialogBox'));
                        delayExecution(() => close(), 2000);
                    });
                }),
                addEvent(addClasses(createButton('Cancelar'), 'adminManagement_cancelButton'), () => { detachChildren(this.view); this.setView() }),
            ]),
        ]);
    }
}