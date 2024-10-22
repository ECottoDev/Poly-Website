/**
* ProfessorTile.js
* @author Gildo Colon <terminator09763@gmail.com>
* @copyright Gildo Colon, All rights reserved.
*
* @version 2024-March-20 initial version
*/

import { addClasses, appendChildren, createElementContainer, createHeadingText, createImg, createParagraph, createTextArea, createTileContainer, getStringDialogBoxView, newLineAtEveryCharacter, toTitleCase } from "../../../../helpers/basicElements.js";

export class ProfessorTile {
    constructor(parentProps, professorData) {
        this.parentProps = parentProps;
        this.professorData = professorData;
        this.view = addClasses(createTileContainer(), 'professorTile_view');
        this.setView();
    }
    setView() {
        appendChildren(this.view, [
            addClasses(createImg(`/frontEnd/${this.professorData.imgLocation}`, "professor image"), 'professorTile_image'),
            appendChildren(addClasses(createElementContainer(), 'professorTile_info'), [
                addClasses(createHeadingText(toTitleCase(this.professorData.fullName)), 'professorTile_firstName'),
                addClasses(createHeadingText(this.professorData.email), 'professorTile_email'),
                addClasses(createHeadingText(this.professorData.position), 'professorTile_position'),
                this.professorData.department == 'N/A' ? addClasses(createHeadingText('Unknown Department, From Orlando or Miami Campus.'), 'professorTile_department') : addClasses(createHeadingText(this.professorData.department), 'professorTile_department'),
                addClasses(createHeadingText('Presione para ver más.'), 'professorTile_messageTitle'),
            ]),

        ])
    }
}