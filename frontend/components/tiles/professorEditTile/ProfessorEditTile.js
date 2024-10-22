/**
* ProfessorEditTile.js
* @author Gildo Colon <terminator09763@gmail.com>
* @copyright Gildo Colon, All rights reserved.
*
* @version 2024-March-20 initial version
*/

import { addClasses, addEvent, appendChildren, createButton, createElementContainer, createHeadingText, createImg, createParagraph, createTextArea, createTileContainer, getStringDialogBoxView, newLineAtEveryCharacter, stopPropagationOnNode, toTitleCase } from "../../../../helpers/basicElements.js";

export class ProfessorEditTile {
    constructor(parentProps, professorData) {
        this.parentProps = parentProps;
        this.professorData = professorData;
        this.view = addClasses(createTileContainer(), 'professorEditTile_view');
        this.setView();
    }
    setView() {
        appendChildren(this.view, [
            addClasses(createImg(`/frontEnd/${this.professorData.imgLocation}`, "professor image"), 'professorEditTile_image'),
            appendChildren(addClasses(createElementContainer(), 'professorEditTile_info'), [
                addClasses(createHeadingText(toTitleCase(this.professorData.fullName)), 'professorEditTile_firstName'),
                addClasses(createHeadingText(this.professorData.email), 'professorEditTile_email'),
                addClasses(createHeadingText(this.professorData.position), 'professorEditTile_position'),
                this.professorData.department == 'N/A' ? addClasses(createHeadingText('Unknown Department, From Orlando or Miami Campus.'), 'professorEditTile_department') : addClasses(createHeadingText(this.professorData.department), 'professorEditTile_department'),
            ]),
        ])
    }
}