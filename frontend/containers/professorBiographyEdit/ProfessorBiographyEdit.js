/**
* ProfessorBiography.js
*
* @author Edwin Cotto <cottosoftwaredevelopment@gmail.com>
* @copyright Edwin Cotto, All rights reserved.
*
* @version 2024-April-29 initial version
*/

import { addClasses, addEvent, appendChildren, createButton, createElementContainer, createFileInputBar, createHeadingText, createImg, createInputBar, createParagraph, createPillBox, createScrollArea, createTextArea, delayExecution, detachChildren, getEmptyMessage, getStringDialogBoxView, newLineAtEveryCharacter, removeClasses, toTitleCase } from "../../../helpers/basicElements.js";
import { Checkbox } from "../../components/checkbox/Checkbox.js";
import { ArticleTiles } from "../../components/tiles/articlesTiles/ArticleTiles.js";
import { AwardTiles } from "../../components/tiles/awardTiles/AwardTiles.js";
import { BookTiles } from "../../components/tiles/bookTiles/BookTIles.js";
import { CertificationTiles } from "../../components/tiles/certificationTiles/CertificationTiles.js";
import { removeImage, renameImage, uploadImage } from "../../databaseCallers/imageDataCalls.js";
import { deleteProfessorData, getProfessorCertifications, getProfessorData, getProfessorPublications, updateProfessorData } from "../../databaseCallers/professorDataCalls.js";
import { ArticleListEditor } from "../articleListEditor/ArticleListEditor.js";
import { AwardListEditor } from "../awardListEditor/AwardListEditor.js";
import { BookListEditor } from "../bookListEditor/BookListEditor.js";
import { CertificationsListEditor } from "../certificationsListEditor/CertificationsListEditor.js";
import { NavigationTabs } from "../navigationTabs/NavigationTabs.js";


export class ProfessorBiographyEdit {
    constructor(parentProps, professorData, close = () => { }) {
        this.parentProps = parentProps;
        this.professorData = professorData;
        this.noDepartment = new Checkbox('No Aplica', { checked: false });
        this.container = addClasses(createElementContainer(), 'professorBiographyEdit_container')
        this.tabs = new NavigationTabs(['Biografía', 'Certificaciones', 'Libros', 'Articulos', 'Premios'], [
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
        this.view = addClasses(createPillBox(), 'professorBiographyEdit_view');
        this.setView();
    }
    async setView() {
        this.publications = await getProfessorPublications(this.professorData.fullName);
        this.certifications = await getProfessorCertifications(this.professorData.fullName);
        appendChildren(this.view, [
            appendChildren(addClasses(createElementContainer(), 'professorBiographyEdit_tabs'), [
                addClasses(this.tabs.view, 'professorBiographyEdit_tabs'),
                this.container
            ]),

        ])
    }

    async biographyView() {
        appendChildren(this.container, [
            addClasses(createImg(`/frontend/${this.professorData.imgLocation}`, "professor image"), 'professorBiographyEdit_image'),
            appendChildren(addClasses(createElementContainer(), 'professorBiographyEdit_info'), [
                appendChildren(addClasses(createElementContainer(), 'professorBiographyEdit_textContainer'), [
                    addClasses(createHeadingText('Nombre Completo: '), 'professorBiographyEdit_heading'),
                    this.fullNameEdit = addClasses(createParagraph(toTitleCase(this.professorData.fullName)), 'professorBiographyEdit_context'),
                ]),
                appendChildren(addClasses(createElementContainer(), 'professorBiographyEdit_textContainer'), [
                    addClasses(createHeadingText('Email: '), 'professorBiographyEdit_heading'),
                    this.emailEdit = addClasses(createParagraph(this.professorData.email), 'professorBiographyEdit_context'),
                ]),
                appendChildren(addClasses(createElementContainer(), 'professorBiographyEdit_textContainer'), [
                    addClasses(createHeadingText('Posición: '), 'professorBiographyEdit_heading'),
                    this.positionEdit = addClasses(createParagraph(this.professorData.position), 'professorBiographyEdit_context'),
                ]),
                appendChildren(addClasses(createElementContainer(), 'professorBiographyEdit_textContainer'), [
                    addClasses(createHeadingText('Departamento: '), 'professorBiographyEdit_heading'),
                    this.departmentEdit = addClasses(createParagraph(this.professorData.department), 'professorBiographyEdit_context'),
                ]),
                appendChildren(addClasses(createElementContainer(), 'professorBiographyEdit_textContainer'), [
                    addClasses(createHeadingText('Horas de oficina: '), 'professorBiographyEdit_heading'),
                    this.officeHoursEdit = addClasses(createParagraph(this.professorData.officeHours), 'professorBiographyEdit_context'),
                ]),
            ]),
            appendChildren(addClasses(createElementContainer(), 'professorBiographyEdit_bioContainer'), [
                addClasses(createHeadingText('Biografía: '), 'professorBiographyEdit_bioHeading'),
                appendChildren(addClasses(createScrollArea(), 'professorBiographyEdit_contextContainer'), [
                    this.shortBiographyEdit = addClasses(createParagraph(this.professorData.shortBiography), 'professorBiographyEdit_bioContext'),
                ])
            ]),
            appendChildren(addClasses(createElementContainer(), 'professorBiographyEdit_buttons'), [
                addEvent(addClasses(createButton('Editar biografía'), 'professorBiographyEdit_editButton'), () => { detachChildren(this.container); this.biographyEditView(); addClasses(this.view, 'professorBiographyEdit_view--edit') }),
                addEvent(addClasses(createButton('Cerrar'), 'professorBiographyEdit_closeButton'), () => { removeClasses(this.view, 'professorBiographyEdit_view--edit'); this.close(); })
            ])
        ])
    }
    async biographyEditView() {
        appendChildren(this.container, [
            appendChildren(addClasses(createElementContainer(), 'professorBiographyEdit_EditInfo'), [
                appendChildren(addClasses(createElementContainer(), 'professorBiographyEdit_textContainer'), [
                    this.imageEdit = addClasses(createFileInputBar({ type: 'file', accept: 'image/png' }), 'professorBiographyEdit_image'),
                    addClasses(createHeadingText('Nombre Completo: '), 'professorBiographyEdit_heading'),
                    this.fullNameEdit = addClasses(createInputBar({ value: toTitleCase(this.professorData.fullName) }), 'professorBiographyEdit_context'),
                ]),
                appendChildren(addClasses(createElementContainer(), 'professorBiographyEdit_textContainer'), [
                    addClasses(createHeadingText('Email: '), 'professorBiographyEdit_heading'),
                    this.emailEdit = addClasses(createInputBar({ value: this.professorData.email }), 'professorBiographyEdit_context'),
                ]),
                appendChildren(addClasses(createElementContainer(), 'professorBiographyEdit_textContainer'), [
                    addClasses(createHeadingText('Posición: '), 'professorBiographyEdit_heading'),
                    this.positionEdit = addClasses(createInputBar({ value: this.professorData.position }), 'professorBiographyEdit_context'),
                ]),
                appendChildren(addClasses(createElementContainer(), 'professorBiographyEdit_textContainer'), [
                    addClasses(createHeadingText('Departamento: '), 'professorBiographyEdit_heading'),
                    this.departmentEdit = addClasses(createInputBar({ value: this.professorData.department }), 'professorBiographyEdit_context'),
                ]),
                appendChildren(addClasses(createElementContainer(), 'professorBiographyEdit_textContainer'), [
                    addClasses(createHeadingText('Horas de oficina: '), 'professorBiographyEdit_heading'),
                    this.officeHoursEdit = addClasses(createInputBar({ value: this.professorData.officeHours }), 'professorBiographyEdit_context'),
                ]),
            ]),
            appendChildren(addClasses(createScrollArea(), 'professorBiographyEdit_bioContainer'), [
                addClasses(createHeadingText('Biografía: '), 'professorBiographyEdit_heading'),
                this.shortBiographyEdit = addClasses(createTextArea(this.professorData.shortBiography), 'professorBiographyEdit_bioContext'),
            ]),
            appendChildren(addClasses(createElementContainer(), 'professorBiographyEdit_buttons'), [
                addEvent(addClasses(createButton('Aplicar Cambios'), 'professorBiographyEdit_applyEdit'), async () => {
                    this.applyChanges();
                    delayExecution(async () => { this.close() }, 1000)
                }),
                addEvent(addClasses(createButton('Cancelar'), 'professorBiographyEdit_cancelEdit'), () => { detachChildren(this.view); this.setView(); detachChildren(this.container); this.biographyView() }),
                addEvent(addClasses(createButton('Eliminar Profesor'), 'professorBiographyEdit_closeButton'), () => {
                    deleteProfessorData(this.professorData.fullName);
                    removeImage(this.professorData.fullName);
                    this.close()


                }),
            ])
        ])
    }
    async certificationsView() {
        appendChildren(this.container, [
            appendChildren(addClasses(createScrollArea(), 'professorBiographyEdit_books'), [
                this.certs = this.certifications[0].certifications.map((cert, index) => {
                    return (cert.title && cert.institute) ? new CertificationTiles(cert, index).view : addClasses(getEmptyMessage('No se encontró ningúna entrada.'), 'professorBiography__emptyContainerMessage');
                })
            ]),
            addEvent(addClasses(createButton('Editar Lista de Certificaciones'), 'professorBiographyEdit_editList'), () => {
                const close = this.parentProps.displayBox(new CertificationsListEditor(this.parentProps, this.professorData, this.certifications[0].certifications, () => {
                    close();
                    delayExecution(async () => {
                        this.certifications = await getProfessorCertifications(this.professorData.fullName);
                        detachChildren(this.container); this.certificationsView()
                    }, 500)
                }, () => { close() }).view)
            }),
        ])
    }
    async booksView() {
        appendChildren(this.container, [
            appendChildren(addClasses(createScrollArea(), 'professorBiographyEdit_books'), [

                this.books = this.publications[0].books.map((book, index) => {
                    return (book.title && book.year && book.publisher) ? new BookTiles(book, index).view : addClasses(getEmptyMessage('No se encontró ningúna entrada.'), 'professorBiography__emptyContainerMessage');
                })
            ]),
            addEvent(addClasses(createButton('Editar Lista de Libros'), 'professorBiographyEdit_editList'), () => { const close = this.parentProps.displayBox(new BookListEditor(this.parentProps, this.professorData, this.publications[0].books, () => { close(); delayExecution(async () => { this.publications = await getProfessorPublications(this.professorData.fullName); detachChildren(this.container); this.booksView() }, 500) }, () => { close(); }).view) }),
        ])
    }
    async articlesView() {
        appendChildren(this.container, [
            appendChildren(addClasses(createScrollArea(), 'professorBiographyEdit_books'), [
                this.articles = this.publications[0].articles.map((article, index) => {
                    return (article.title && article.journal && article.year) ? new ArticleTiles(article, index).view : addClasses(getEmptyMessage('No se encontró ningúna entrada.'), 'professorBiography__emptyContainerMessage');
                })]),

            addEvent(addClasses(createButton('Editar Lista de Articulos'), 'professorBiographyEdit_editList'), () => { const close = this.parentProps.displayBox(new ArticleListEditor(this.parentProps, this.professorData, this.publications[0].articles, () => { close(); delayExecution(async () => { this.publications = await getProfessorPublications(this.professorData.fullName); detachChildren(this.container); this.articlesView() }, 500) }, () => { close(); }).view) }),
        ])
    }
    async awardsView() {
        appendChildren(this.container, [
            appendChildren(addClasses(createScrollArea(), 'professorBiographyEdit_books'), [
                this.awards = this.publications[0].awards.map((award, index) => {
                    return (award.name && award.year && award.institution) ? new AwardTiles(award, index).view : addClasses(getEmptyMessage('No se encontró ningúna entrada.'), 'professorBiography__emptyContainerMessage');
                })]),
            addEvent(addClasses(createButton('Editar Lista de Premiios'), 'professorBiographyEdit_editList'), () => { const close = this.parentProps.displayBox(new AwardListEditor(this.parentProps, this.professorData, this.publications[0].awards, () => { close(); delayExecution(async () => { this.publications = await getProfessorPublications(this.professorData.fullName); detachChildren(this.container); this.awardsView() }, 500) }, () => { close(); }).view) }),
        ])
    }

    async applyChanges() {
        const imageLocation = `assets/images/staff/${this.fullNameEdit.value.toLowerCase().replace(/\s+/g, '_')}.png`;
        const fullName = this.fullNameEdit.value;
        this.professorEditData = {
            fullName: fullName,
            email: this.emailEdit.value,
            position: this.positionEdit.value,
            department: this.departmentEdit.value,
            officeHours: this.officeHoursEdit.value,
            imgLocation: imageLocation,
            shortBio: this.shortBiographyEdit.value
        }
        await updateProfessorData(this.professorEditData, this.professorData.fullName);

        if (!this.imageEdit.files[0]) {
            await renameImage(`${this.professorData.fullName.toLowerCase().replace(/\s+/g, '_')}.png`, `${fullName.toLowerCase().replace(/\s+/g, '_')}.png`);
            return;
        }


        const file = this.imageEdit.files[0];
        const formattedName = imageLocation
        const renamedFile = new File([file], formattedName, { type: file.type });
        uploadImage(renamedFile);
    }
}