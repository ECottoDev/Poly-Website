import { addClasses, addEvent, appendChildren, createButton, createElementContainer, createHeadingText, createPillBox } from "../../../helpers/basicElements.js";
import { EditableBookArray } from "../../components/editableBookArray/EditableBookArray.js";
import { updateBookData } from "../../databaseCallers/professorDataCalls.js";

export class BookListEditor {
    constructor(parentprops, professorData, books, apply = () => { }, close = () => { }) {
        this.parentProps = parentprops
        this.professorData = professorData;
        this.books = new EditableBookArray(this.parentProps, books);
        this.apply = apply;
        this.close = close;
        this.view = addClasses(createPillBox(), 'bookListEditor_view');
        this.setView();
    }
    setView() {
        appendChildren(this.view, [
            addClasses(createHeadingText('Editar Libros'), 'bookListEditor_heading'),
            appendChildren(addClasses(createElementContainer(), 'bookListEditor_booksContainer'), [
                this.books.view,
            ]),
            addEvent(addClasses(createButton('Añadir libro'), 'bookListEditor_addButton'), () => { this.books.addInput() }),
            addEvent(addClasses(createButton('Aplicar'), 'bookListEditor_applyButton'), async () => { await updateBookData(this.professorData.fullName, this.books.getUpdatedArray()); this.apply() }),
            addEvent(addClasses(createButton('Cancelar'), 'bookListEditor_closeButton'), () => { this.close() })
        ])
    }
}