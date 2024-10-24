import { addClasses, addEvent, appendChildren, createButton, createFileInputBar, createHeadingText, createInputBar, createPillBox, createTextArea } from "../../../helpers/basicElements.js";
import { uploadImage } from "../../databaseCallers/imageDataCalls.js";
import { insertProfessorData } from "../../databaseCallers/professorDataCalls.js";

export class AddProfessor {
    constructor(parentProps, close = () => { }) {
        this.parentProps = parentProps;
        this.close = close;
        this.view = addClasses(createPillBox(), 'addProfessor_view');
        this.setView();
    }
    async setView() {
        appendChildren(this.view, [
            addClasses(createHeadingText('Añadir Profesor'), 'addProfessor_heading'),
            this.image = addClasses(createFileInputBar({ type: 'file', accept: 'image/png' }), 'addProfessor_image'),
            this.fullName = addClasses(createInputBar({ placeholder: 'Nombre Completo' }), 'addProfessor_fullName'),
            this.email = addClasses(createInputBar({ placeholder: 'Email' }), 'addProfessor_email'),
            this.position = addClasses(createInputBar({ placeholder: 'Posición' }), 'addProfessor_position'),
            this.department = addClasses(createInputBar({ placeholder: 'Departamento' }), 'addProfessor_department'),
            this.officeHours = addClasses(createInputBar({ placeholder: 'Horas de oficina (ej. Lunes: 1pm-3pm)' }), 'addProfessor_office'),
            this.shortBio = addClasses(createTextArea('', { placeholder: `Biografía` }), 'addProfessor_shortBio'),
            addEvent(addClasses(createButton('Añadir Profesor'), 'addProfessor_addButton'), async (event) => {
                this.imgLocation = `/assets/images/staff/${this.fullName.value.toLowerCase().replace(/\s+/g, '_')}.png`
                this.certifications = [{ title: '', institution: '' }];
                this.books = [{ title: '', year: '', publisher: '' }];
                this.articles = [{ title: '', journal: '', year: '' }];
                this.awards = [{ name: '', year: '', institution: '' }];
                this.insertData();
                this.upload();

            })
        ]);
    }
    upload() {
        const file = this.image.files[0];
        if (!file || !this.fullName.value) {
            return;
        }
        const formattedName = `${this.fullName.value.toLowerCase().replace(/\s+/g, '_')}.png`;
        const renamedFile = new File([file], formattedName, { type: file.type });
        uploadImage(renamedFile);
        this.close();
    }
    async insertData() {
        const file = this.image.files[0];
        if (!file || !this.fullName.value) {
            alert("Favor de llenar su nombre y subir una imagen.");
            return;
        }
        const professorData = {
            fullName: this.fullName.value,
            email: this.email.value,
            position: this.position.value,
            department: this.department.value,
            officeHours: this.officeHours.value,
            imgLocation: this.imgLocation,
            shortBio: this.shortBio.value,
            certifications: this.certifications,
            books: this.books,
            articles: this.articles,
            awards: this.awards
        }
        await insertProfessorData(professorData);

    }

}