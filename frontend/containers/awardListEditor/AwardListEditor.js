import { addClasses, addEvent, appendChildren, createButton, createElementContainer, createHeadingText, createPillBox } from "../../../helpers/basicElements.js";
import { EditableAwardArray } from "../../components/editableAwardArray/EditableAwardArray.js";
import { updateAwardData } from "../../databaseCallers/professorDataCalls.js";

export class AwardListEditor {
    constructor(parentprops, professorData, awards, apply = () => { }, close = () => { }) {
        this.parentProps = parentprops
        this.professorData = professorData;
        this.awards = new EditableAwardArray(this.parentProps, awards);
        this.apply = apply;
        this.close = close;
        this.view = addClasses(createPillBox(), 'awardListEditor_view');
        this.setView();
    }
    setView() {
        appendChildren(this.view, [
            addClasses(createHeadingText('Editar Premios'), 'awardListEditor_heading'),
            appendChildren(addClasses(createElementContainer(), 'awardListEditor_articleContainer'), [
                this.awards.view,
            ]),
            addEvent(addClasses(createButton('Añadir premio'), 'awardListEditor_addButton'), () => { this.awards.addInput() }),
            addEvent(addClasses(createButton('Aplicar'), 'awardListEditor_applyButton'), async () => { await updateAwardData(this.professorData.fullName, this.awards.getUpdatedArray()); this.apply() }),
            addEvent(addClasses(createButton('Cancelar'), 'awardListEditor_closeButton'), () => { this.close() })
        ])
    }
}