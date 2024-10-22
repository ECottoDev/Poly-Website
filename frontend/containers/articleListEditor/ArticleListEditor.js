import { addClasses, addEvent, appendChildren, createButton, createElementContainer, createPillBox } from "../../../helpers/basicElements.js";
import { EditableArticleArray } from "../../components/editableArticleArray/EditableArticleArray.js";
import { updateArticleData } from "../../databaseCallers/professorDataCalls.js";

export class ArticleListEditor {
    constructor(parentprops, professorData, articles, close = () => { }) {
        this.parentProps = parentprops
        this.professorData = professorData;
        this.articles = new EditableArticleArray(this.parentProps, articles);
        this.close = close;
        this.view = addClasses(createPillBox(), 'articleListEditor_view');
        this.setView();
    }
    setView() {
        appendChildren(this.view, [
            appendChildren(addClasses(createElementContainer(), 'articleListEditor_articlesContainer'), [
                this.articles.view,
            ]),
            addEvent(addClasses(createButton('Add Article'), 'articleListEditor_addButton'), () => { this.articles.addInput() }),
            addEvent(addClasses(createButton('Apply'), 'articleListEditor_applyButton'), async () => { await updateArticleData(this.professorData.fullName, this.articles.getUpdatedArray()); this.close() }),
            addEvent(addClasses(createButton('Cancel'), 'articleListEditor_closeButton'), () => { this.close() })
        ])
    }
}