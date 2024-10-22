/**
* ProfessorBiography.js
*
* @author Edwin Cotto <cottosoftwaredevelopment@gmail.com>
* @copyright Edwin Cotto, All rights reserved.
*
* @version 2024-April-29 initial version
*/

import { addClasses, addEvent, appendChildren, createButton, createElementContainer, createHeadingText, createImg, createInputBar, createParagraph, createPillBox, createScrollArea, createTextArea, detachChildren, getEmptyMessage, getStringDialogBoxView, newLineAtEveryCharacter, toTitleCase } from "../../../helpers/basicElements.js";
import { Checkbox } from "../../components/checkbox/Checkbox.js";
import { ArticleTiles } from "../../components/tiles/articlesTiles/ArticleTiles.js";
import { AwardTiles } from "../../components/tiles/awardTiles/AwardTiles.js";
import { BookTiles } from "../../components/tiles/bookTiles/BookTIles.js";
import { CertificationTiles } from "../../components/tiles/certificationTiles/CertificationTiles.js";
import { getProfessorCertifications, getProfessorPublications } from "../../databaseCallers/professorDataCalls.js";
import { NavigationTabs } from "../navigationTabs/NavigationTabs.js";


export class ProfessorBiography {
    constructor(parentProps, professorData, close = () => { }) {
        this.parentProps = parentProps;
        this.professorData = professorData;
        this.noDepartment = new Checkbox('No Aplica', { checked: false });
        this.container = addClasses(createElementContainer(), 'professorBiography_container')
        this.tabs = new NavigationTabs(['Biography', 'Certifications', 'Books', 'Articles', 'Awards'], [
            [() => {
                detachChildren(this.container);
                this.biographyView()
            }],
            [() => {
                detachChildren(this.container);
                this.certificationsView()
            }],
            [() => {
                detachChildren(this.container);
                this.booksView()
            }],
            [() => {
                detachChildren(this.container);
                this.articlesView()
            }],
            [() => {
                detachChildren(this.container);
                this.awardsView()
            }]
        ]);
        this.close = close;
        this.view = addClasses(createPillBox(), 'professorBiography_view');
        this.setView();
    }
    async setView() {
        this.publications = await getProfessorPublications(this.professorData.fullName);
        this.certifications = await getProfessorCertifications(this.professorData.fullName);
        appendChildren(this.view, [
            appendChildren(addClasses(createElementContainer(), 'professorBiography_tabsContainer'), [
                addClasses(this.tabs.view, 'professorBiography_tabs'),
                this.container
            ]),
            appendChildren(addClasses(createElementContainer(), 'professorBiography_buttons'), [
                addEvent(addClasses(createButton('Cerrar'), 'professorBiography_closeButton'), () => { this.close() })
            ])
        ])
    }

    async biographyView() {
        appendChildren(this.container, [
            addClasses(createImg(`/frontEnd/${this.professorData.imgLocation}`, "professor image"), 'professorBiography_image'),
            appendChildren(addClasses(createElementContainer(), 'professorBiography_info'), [
                appendChildren(addClasses(createElementContainer(), 'professorBiography_textContainer'), [
                    addClasses(createHeadingText('Nombre Completo: '), 'professorBiography_heading'),
                    this.fullNameEdit = addClasses(createParagraph(toTitleCase(this.professorData.fullName)), 'professorBiography_context'),
                ]),
                appendChildren(addClasses(createElementContainer(), 'professorBiography_textContainer'), [
                    addClasses(createHeadingText('Email: '), 'professorBiography_heading'),
                    this.emailEdit = addClasses(createParagraph(this.professorData.email), 'professorBiography_context'),
                ]),
                appendChildren(addClasses(createElementContainer(), 'professorBiography_textContainer'), [
                    addClasses(createHeadingText('Posición: '), 'professorBiography_heading'),
                    this.positionEdit = addClasses(createParagraph(this.professorData.position), 'professorBiography_context'),
                ]),
                appendChildren(addClasses(createElementContainer(), 'professorBiography_textContainer'), [
                    addClasses(createHeadingText('Departamento: '), 'professorBiography_heading'),
                    this.departmentEdit = addClasses(createParagraph('Departamento desconocido'), 'professorBiography_context'),
                ]),
                appendChildren(addClasses(createElementContainer(), 'professorBiography_textContainer'), [
                    addClasses(createHeadingText('Horas de oficina: '), 'professorBiography_heading'),
                    this.officeHoursEdit = addClasses(createParagraph(this.professorData.officeHours), 'professorBiography_context'),
                ]),
            ]),
            appendChildren(addClasses(createElementContainer(), 'professorBiography_bioContainer'), [
                addClasses(createHeadingText('Biografía: '), 'professorBiography_heading'),
                appendChildren(addClasses(createScrollArea(), 'professorBiography_contextContainer'), [
                    this.shortBiographyEdit = addClasses(createParagraph(this.professorData.shortBiography), 'professorBiography_context'),
                ])
            ]),
        ])
    }
    async certificationsView() {
        appendChildren(this.container, [
            appendChildren(addClasses(createScrollArea(), 'professorBiography_books'), [
                this.certs = this.certifications[0].certifications.map((cert, index) => {
                    return (cert.title && cert.institute) ? new CertificationTiles(cert, index).view : addClasses(getEmptyMessage('No se encontró ningúna entrada.'), 'professorBiography__emptyContainerMessage');
                })
            ]),
        ])
    }
    async booksView() {
        appendChildren(this.container, [
            appendChildren(addClasses(createScrollArea(), 'professorBiography_books'), [
                this.books = this.publications[0].books.map((book, index) => {
                    return (book.title && book.year && book.publisher) ? new BookTiles(book, index).view : addClasses(getEmptyMessage('No se encontró ningúna entrada.'), 'professorBiography__emptyContainerMessage');
                })
            ]),
        ])
    }
    async articlesView() {
        appendChildren(this.container, [
            appendChildren(addClasses(createScrollArea(), 'professorBiography_books'), [
                this.articles = this.publications[0].articles.map((article, index) => {
                    return (article.title && article.journal && article.year) ? new ArticleTiles(article, index).view : addClasses(getEmptyMessage('No se encontró ningúna entrada.'), 'professorBiography__emptyContainerMessage');
                })]),
        ])
    }
    async awardsView() {
        appendChildren(this.container, [
            appendChildren(addClasses(createScrollArea(), 'professorBiography_books'), [
                this.awards = this.publications[0].awards.map((award, index) => {
                    return (award.name && award.year && award.institution) ? new AwardTiles(award, index).view : addClasses(getEmptyMessage('No se encontró ningúna entrada.'), 'professorBiography__emptyContainerMessage');
                })]),
        ])
    }
}