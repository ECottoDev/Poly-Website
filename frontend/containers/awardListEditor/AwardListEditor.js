import { addClasses, addEvent, appendChildren, createButton, createElementContainer, createPillBox } from "../../../helpers/basicElements.js";
import { EditableAwardArray } from "../../components/editableAwardArray/EditableAwardArray.js";
import { updateAwardData } from "../../databaseCallers/professorDataCalls.js";

export class AwardListEditor {
    constructor(parentprops, professorData, awards, close = () => { }) {
        this.parentProps = parentprops
        this.professorData = professorData;
        this.awards = new EditableAwardArray(this.parentProps, awards);
        this.close = close;
        this.view = addClasses(createPillBox(), 'articleListEditor_view');
        this.setView();
    }
    setView() {
        appendChildren(this.view, [
            appendChildren(addClasses(createElementContainer(), 'articleListEditor_articleContainer'), [
                this.awards.view,
            ]),
            addEvent(addClasses(createButton('Add Book'), 'articleListEditor_addButton'), () => { this.awards.addInput() }),
            addEvent(addClasses(createButton('Apply'), 'articleListEditor_applyButton'), async () => { await updateAwardData(this.professorData.fullName, this.awards.getUpdatedArray()); this.close() }),
            addEvent(addClasses(createButton('Cancel'), 'articleListEditor_closeButton'), () => { this.close() })
        ])
    }
}