import { addClasses, addEvent, appendChildren, createButton, createElementContainer, createPillBox } from "../../../helpers/basicElements.js";
import { EditableBookArray } from "../../components/editableBookArray/EditableBookArray.js";
import { updateBookData } from "../../databaseCallers/professorDataCalls.js";

export class BookListEditor {
    constructor(parentprops, professorData, books, close = () => { }) {
        this.parentProps = parentprops
        this.professorData = professorData;
        this.books = new EditableBookArray(this.parentProps, books);
        this.close = close;
        this.view = addClasses(createPillBox(), 'bookListEditor_view');
        this.setView();
    }
    setView() {
        appendChildren(this.view, [
            appendChildren(addClasses(createElementContainer(), 'bookListEditor_booksContainer'), [
                this.books.view,
            ]),
            addEvent(addClasses(createButton('Add Book'), 'bookListEditor_addButton'), () => { this.books.addInput() }),
            addEvent(addClasses(createButton('Apply'), 'bookListEditor_applyButton'), async () => { await updateBookData(this.professorData.fullName, this.books.getUpdatedArray()); this.close() }),
            addEvent(addClasses(createButton('Cancel'), 'bookListEditor_closeButton'), () => { this.close() })
        ])
    }
}