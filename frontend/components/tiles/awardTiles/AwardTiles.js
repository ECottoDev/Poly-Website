import { addClasses, appendChildren, createElementContainer, createHeadingText, createParagraph, createPillBox } from "../../../../helpers/basicElements.js";

export class AwardTiles {
    constructor(award, index) {
        this.award = award;
        this.index = index + 1;
        this.view = addClasses(createPillBox(true), 'awardTile_view');
        this.setView();
    }
    async setView() {
        appendChildren(this.view, [
            addClasses(createHeadingText(this.index), 'awardTile_index'),
            appendChildren(addClasses(createElementContainer('left'), 'awardTile_info'), [
                addClasses(createHeadingText(this.award.name), 'awardTile_name'),
                addClasses(createParagraph(this.award.year), 'awardTile_year'),
                addClasses(createParagraph(this.award.institution), 'awardTile_institution'),
            ]),
        ])
    }
}