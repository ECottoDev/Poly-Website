/**
* ProfessorRoster.js
*
* @author Edwin Cotto <cottosoftwaredevelopment@gmail.com>
* @copyright Edwin Cotto, All rights reserved.
*
* @version 2024-April-22 initial version
*/

import { SearchBar } from "../../components/searchBar/SearchBar.js";
import { ProfessorBiography } from "../../containers/professorBiography/ProfessorBiography.js";
import { ProfessorTile } from "../../components/tiles/professorTile/ProfessorTile.js";
import { addClasses, addEvent, appendChildren, createButton, createElementContainer, createHeadingText, createPillBox, createScrollArea, detachChildren, getEmptyMessage, searchArray, sortArrayOfObj } from "../../../helpers/basicElements.js";
import { getProfessorData } from "../../databaseCallers/professorDataCalls.js";
import { routes } from "../../../helpers/router.js";

export class ProfessorRoster {
    constructor(parentProps) {
        this.parentProps = parentProps;
        this.scrollArea = addClasses(createScrollArea(), 'professorRoster_scrollArea');
        this.searchInput = '';
        this.searchBar = new SearchBar(value => {
            this.searchInput = value;
            this.populateTiles()
        });
        this.view = addClasses(createPillBox(), 'professorRoster_view');
        this.fetch();
    }
    async fetch() {
        const response = await getProfessorData();
        this.professorData = response;
        this.setView();
    }
    setView() {
        appendChildren(this.view, [
            appendChildren(addClasses(createElementContainer(), "professorRoster_scrollAreaHeader"), [addClasses(createHeadingText('Facultad: Departamento de Ciencias de Computadoras e ingieneria'), "professorRoster_title"),

            appendChildren(addClasses(createElementContainer(), 'professorRoster_buttonAndSearch'), [
                addEvent(addClasses(createButton('Ingresar'), "professorRoster_loginButton"), () => { this.parentProps.setNavState(routes.LOGIN) }),
                addClasses(this.searchBar.view, "professorRoster_searchBar"),]),
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
                return addEvent(addClasses(new ProfessorTile(this.parentProps, entry).view, 'professorRoster_professorTile'), () => { const closeDisplay = this.parentProps.displayBox(new ProfessorBiography(this.parentProps, entry, () => { closeDisplay() }).view) })
            }) : addClasses(getEmptyMessage('No se encontró ningún caso.'), 'myCases__emptyContainerMessage'));
    }

}