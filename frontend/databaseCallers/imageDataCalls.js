

const port = 5507
const host = 'https://luxprogramming.com'
//const host = 'https://44.193.226.223'
// const host = 'http://localhost'
const domain = `${host}:${port}`


export async function renameImage(oldName, newName) {
    try {
        const response = await fetch(`${domain}/professors/renameImage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ oldName, newName })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();  // Parse the server response
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}


export async function uploadImage(file) {
    try {
        const formData = new FormData();
        formData.append('image', file);

        // Send the image and additional data to the server
        const response = await fetch(`${domain}/professors/uploadImg`, {
            method: 'POST',
            body: formData  // Send the FormData object as the body
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();  // Parse the server response
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
export async function removeImage(professorName) {
    try {
        const response = await fetch(`${domain}/professors/removeImg`, {
            method: 'POST',  // If you insist on POST instead of DELETE
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fullName: professorName })  // Pass the professor name in the body
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();  // Parse the server response
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}


