import { addAttributes, addClasses, addEvent, appendChildren, createButton, createElementContainer, createHeadingText, createInputBar, createPillBox, createScrollArea, detachChildren } from "../../../helpers/basicElements.js";

export class EditableCertificationsArray {
    constructor(parentProps, array) {
        this.parentProps = parentProps
        this.array = (array[0].title && array[0].institute) ? array : [{ title: '', institute: '' }];
        this.view = addClasses(createScrollArea(), 'editableArray_view');
        this.setView();
    }

    setView() {
        appendChildren(detachChildren(this.view), [
            this.array.map((obj, index) => {
                const container = addAttributes(addClasses(createElementContainer('all'), 'editableArray_object'), { 'data-index': index });
                Object.keys(obj).forEach((key) => {
                    appendChildren(container, [
                        addEvent(addAttributes(addClasses(createInputBar({ placeholder: key, value: obj[key] }), 'editableArray_input'), { 'data-key': key }),
                            (e) => { this.array[index][key] = e.target.value } // Update the array on input change
                        ),
                    ]);
                });
                appendChildren(container, [
                    addEvent(addClasses(createButton('Eliminar Certificacion'), 'editableArray_removeButton'), () => { this.removeObjectAtIndex(index) }) // Add button
                ]);
                return container;
            }),
            // Append each object container
        ]);

    }

    addInput() {
        this.updateArrayFromInputs();
        // Define the 3 blank keys for the new object
        const blankObject = {
            title: '',
            institute: ''
        };
        this.array.push(blankObject);
        this.setView();
    }


    updateArrayFromInputs() {
        const objectContainers = this.view.querySelectorAll('.editableArray_object'); // Select each object container
        objectContainers.forEach(container => {
            const index = container.getAttribute('data-index'); // Get the index from the parent container
            const inputs = container.querySelectorAll('.editableArray_input'); // Select all inputs within this container

            inputs.forEach(input => {
                const key = input.getAttribute('data-key'); // Get the key from data attribute
                if (this.array[index]) {
                    this.array[index][key] = input.value; // Update the corresponding property in the array
                }
            });
        });
    }

    getUpdatedArray() {
        this.updateArrayFromInputs();
        return this.array;
    }

    removeObjectAtIndex(index) {
        if (index >= 0 && index < this.array.length) {
            this.array.splice(index, 1); // Remove the object at the specified index
            this.setView(); // Re-render the view
        }
        if (index == 0) {
            this.array = [{ title: '', institute: '' }];
            this.setView();
        }
        else {
            console.log('Invalid index');
        }
    }

}
