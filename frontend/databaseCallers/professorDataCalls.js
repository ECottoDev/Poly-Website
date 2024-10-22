/**
* professorDataCalls.js
*
* @author Edwin Cotto <edtowers1037@gmail.com>
* @copyright Edwin Cotto, All rights reserved.
*
* @version 2024-February-04 initial version
*/


// Purpose: This file contains all the data calls to the backend server.

//education data
const port = 5507
// const host = 'https://luxprogramming.com'
//const host = 'https://44.193.226.223'
const host = 'http://localhost'
const domain = `${host}:${port}`

// Function to get education data
export async function getProfessorData() {
    try {
        const response = await fetch(`${domain}/professors/getProfessorData`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export async function insertProfessorData(professorData) {
    const response = await fetch(`${domain}/professors/insertProfessorData`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(professorData)
    });
}

export async function getProfessorPublications(professorName) {
    try {
        const response = await fetch(`${domain}/professors/getProfessorPublications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ professorName })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
export async function getProfessorCertifications(professorName) {
    try {
        const response = await fetch(`${domain}/professors/getProfessorCerifications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ professorName })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export async function updateProfessorData(professorData, originalName) {
    const response = await fetch(`${domain}/professors/updateProfessorData`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ professorData, originalName })
    });

    return response.json();
}

//function to post data into the database
export async function updateBookData(professorName, bookArray) {
    const response = await fetch(`${domain}/professors/updateBookData`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ professorName, bookArray })
    });

    return response.json();
}
export async function updateArticleData(professorName, articleArray) {
    const response = await fetch(`${domain}/professors/updateArticleData`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ professorName, articleArray })
    });

    return response.json();
}
export async function updateAwardData(professorName, awardArray) {
    const response = await fetch(`${domain}/professors/updateAwardData`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ professorName, awardArray })
    });

    return response.json();
}
export async function updateCertificationData(professorName, certArray) {
    const response = await fetch(`${domain}/professors/updateCertData`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ professorName, certArray })
    });

    return response.json();
}

export async function getPassword() {
    const response = await fetch(`${domain}/professors/getPassword`);
    return response.json();
}

export async function deleteProfessorData(professorName) {
    const response = await fetch(`${domain}/professors/deleteProfessorData`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ professorName })
    });
}