import { addClasses, appendChildren, createElementContainer, createHeadingText, createParagraph, createPillBox } from "../../../../helpers/basicElements.js";

export class ArticleTiles {
    constructor(articles, index) {
        this.articles = articles;
        this.index = index + 1;
        this.view = addClasses(createPillBox(true), 'articleTile_view');
        this.setView();
    }
    async setView() {
        appendChildren(this.view, [
            addClasses(createHeadingText(this.index), 'articleTile_index'),
            appendChildren(addClasses(createElementContainer('left'), 'articleTile_info'), [
                addClasses(createHeadingText(this.articles.title), 'articleTile_title'),
                addClasses(createParagraph(this.articles.year), 'articleTile_year'),
                addClasses(createParagraph(this.articles.journal), 'articleTile_journal'),
            ]),
        ])
    }
}