import { addClasses, appendChildren, createElementContainer, createHeadingText, createParagraph, createPillBox } from "../../../../helpers/basicElements.js";

export class CertificationTiles {
    constructor(certifications, index) {
        this.certifications = certifications;
        this.index = index + 1;
        this.view = addClasses(createPillBox(true), 'certificationTile_view');
        this.setView();
    }
    async setView() {
        appendChildren(this.view, [
            addClasses(createHeadingText(this.index), 'certificationTile_index'),
            appendChildren(addClasses(createElementContainer('left'), 'certificationTile_info'), [
                addClasses(createHeadingText(this.certifications.title), 'certificationTile_title'),
                addClasses(createParagraph(this.certifications.institute), 'certificationTile_institute'),
            ]),
        ])
    }
}