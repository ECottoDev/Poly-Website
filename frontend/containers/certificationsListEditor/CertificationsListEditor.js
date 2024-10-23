import { addClasses, addEvent, appendChildren, createButton, createElementContainer, createPillBox } from "../../../helpers/basicElements.js";
import { EditableArticleArray } from "../../components/editableArticleArray/EditableArticleArray.js";
import { EditableCertificationsArray } from "../../components/editableCertificationsArray/EditableCertificationsArray.js";
import { updateCertificationData } from "../../databaseCallers/professorDataCalls.js";

export class CertificationsListEditor {
    constructor(parentprops, professorData, certs, close = () => { }) {
        this.parentProps = parentprops
        this.professorData = professorData;
        this.certs = new EditableCertificationsArray(this.parentProps, certs);
        this.close = close;
        this.view = addClasses(createPillBox(), 'certificationsListEditor_view');
        this.setView();
    }
    setView() {
        appendChildren(this.view, [
            addClasses(createButton('Editar Certificaciones'), 'certificationsListEditor_heading'),
            appendChildren(addClasses(createElementContainer(), 'certificationsListEditor_certsContainer'), [
                this.certs.view,
            ]),
            addEvent(addClasses(createButton('Añadir Certificación'), 'certificationsListEditor_addButton'), () => { this.certs.addInput() }),
            addEvent(addClasses(createButton('Aplicar'), 'certificationsListEditor_applyButton'), async () => { await updateCertificationData(this.professorData.fullName, this.certs.getUpdatedArray()); this.close() }),
            addEvent(addClasses(createButton('Cancelar'), 'certificationsListEditor_closeButton'), () => { this.close() })
        ])
    }
}