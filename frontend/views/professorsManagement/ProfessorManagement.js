/**
* ProfessorManagement.js
*
* @author Edwin Cotto <cottosoftwaredevelopment@gmail.com>
* @copyright Edwin Cotto, All rights reserved.
*
* @version 2024-April-22 initial version
*/

import { SearchBar } from "../../components/searchBar/SearchBar.js";
import { addClasses, addEvent, appendChildren, createButton, createElementContainer, createHeadingText, createPillBox, createScrollArea, delayedListener, delayExecution, deleteUsernameCookie, detachChildren, getEmptyMessage, searchArray, sortArrayOfObj } from "../../../helpers/basicElements.js";
import { getProfessorData } from "../../databaseCallers/professorDataCalls.js";
import { ProfessorEditTile } from "../../components/tiles/professorEditTile/ProfessorEditTile.js";
import { ProfessorBiographyEdit } from "../../containers/professorBiographyEdit/ProfessorBiographyEdit.js";
import { systemLogout, verifySession } from "../../databaseCallers/loginDataCalls.js";
import { AddProfessor } from "../../containers/addProfessor/AddProfessor.js";
import { routes } from "../../../helpers/router.js";
import { AdminMangement } from "../adminManagement/AdminManagement.js";

export class ProfessorManagement {
    constructor(parentProps) {
        this.parentProps = parentProps;
        this.scrollArea = addClasses(createScrollArea(), 'professorManagement_scrollArea');
        this.searchInput = '';
        this.searchBar = new SearchBar(value => {
            this.searchInput = value;
            this.populateTiles()
        });
        this.view = addClasses(createPillBox(), 'professorManagement_view');
        this.fetch();
    }
    async fetch() {
        const response = await getProfessorData();
        this.professorData = response;
        this.setView();
    }
    setView() {
        appendChildren(this.view, [
            appendChildren(addClasses(createElementContainer(), "professorManagement_scrollAreaHeader"), [
                addClasses(createHeadingText('Facultad: Departamento de Ciencias de Computadoras e ingieneria'), "professorManagement_title"),
                appendChildren(addClasses(createElementContainer(), 'professorManagement_buttonAndSearch'), [
                    addEvent(addClasses(createButton('Administración'), "professorManagement_adminButton"), () => { const close = this.parentProps.displayBox(new AdminMangement(this.parentProps, () => { close() }).view) }),
                    addEvent(addClasses(createButton('Añadir Profesor'), "professorManagement_addProfessorButton"), () => { const close = this.parentProps.displayBox(new AddProfessor(this.parentProps, () => { close(); delayExecution(() => { detachChildren(this.view); this.fetch(); }, 1000) }).view) }),
                    addEvent(addClasses(createButton('Salir'), "professorManagement_exitButton"), () => { this.logout(); verifySession(this.parentProps.username()) }),
                    addClasses(this.searchBar.view, "professorManagement_searchBar"),
                ]),
            ]),
            appendChildren(this.scrollArea, [
                this.populateTiles()
            ])
        ])
    }
    handleSearch() {
        let filteredTiles = this.professorData;
        this.searchInput && (filteredTiles = searchArray(this.professorData, this.searchInput, 'fullName', 'email', 'position', 'department'));
        filteredTiles.sort(sortArrayOfObj('fullName'))
        return filteredTiles;
    }
    populateTiles() {
        appendChildren(detachChildren(this.scrollArea),
            this.handleSearch().length ? this.handleSearch().map((entry) => {
                return addEvent(addClasses(new ProfessorEditTile(this.parentProps, entry).view, 'professorManagement_professorTile'), () => {
                    const closeDisplay = this.parentProps.displayBox(new ProfessorBiographyEdit(this.parentProps, entry, () => { closeDisplay(); delayExecution(() => { detachChildren(this.view); this.fetch() }, 1000) }).view)
                })
            }) : addClasses(getEmptyMessage('No se encontró ningúna entrada.'), 'professorManagement__emptyContainerMessage'));
    }
    async logout() {
        await systemLogout(this.parentProps.username(),
            () => {
                const close = this.parentProps.displayBox(appendChildren(createPillBox(), [
                    createHeadingText('Sesión cerrada exitosamente.'),
                    createButton('close'),
                    delayExecution(() => {
                        deleteUsernameCookie();
                        close();
                        delayedListener(this.parentProps.setNavState(routes.HOME_VIEW))
                    }, 1000)])
                )
            },
            () => {
                const close = this.parentProps.displayBox(appendChildren(createPillBox(), [
                    createHeadingText('Se produjo un error al cerrar la sesión.'),
                    addEvent(createButton('close'), () => close())
                ]))
            })
    }

    async addProfessor() {
        const close = this.parentProps.displayBox(new ProfessorBiographyEdit(this.parentProps, { fullName: '', email: '', position: '', department: '', imgLocation: '' }, () => { close() }).view)
    }
}