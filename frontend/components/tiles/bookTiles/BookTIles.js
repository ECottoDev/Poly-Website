import { addClasses, appendChildren, createElementContainer, createHeadingText, createParagraph, createPillBox } from "../../../../helpers/basicElements.js";

export class BookTiles {
    constructor(book, index) {
        this.book = book;
        this.index = index + 1;
        this.view = addClasses(createPillBox(true), 'bookTile_view');
        this.setView();
    }
    async setView() {
        appendChildren(this.view, [
            addClasses(createHeadingText(this.index), 'bookTile_index'),
            appendChildren(addClasses(createElementContainer('left'), 'bookTile_info'), [
                addClasses(createHeadingText(this.book.title), 'bookTile_title'),
                addClasses(createParagraph(this.book.year), 'bookTile_year'),
                addClasses(createParagraph(this.book.publisher), 'bookTile_publisher'),
            ]),
        ])
    }
}