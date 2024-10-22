/**
* routes.js
*
* @author Edwin Cotto <edtowers1037@gmail.com>
* @copyright Edwin Cotto, All rights reserved.
*
* @version 2024-February-04 initial version
*/
const express = require('express');
const router = express.Router();
const professorDB = require('./professorsDatabase');
const loginDB = require('./loginDatabase');
const imageUploader = require('./imageUploader');
const bodyParser = require('body-parser');
const imageRemover = require('./imageRemover');
const imageRenamer = require('./imageRenamer');
router.use(bodyParser.json());

//Resume Database Routes
//Education database connections

router.get('/professors/getProfessorData', async (req, res) => {
    try {
        const result = await professorDB.getProfessorData();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/professors/getProfessorPublications', async (req, res) => {
    const { professorName } = req.body;
    try {
        const result = await professorDB.getAllProfessorsPublications(professorName);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
router.post('/professors/getProfessorCerifications', async (req, res) => {
    const { professorName } = req.body;
    try {
        const result = await professorDB.getAllProfessorsCertifications(professorName);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/professors/renameImage', async (req, res) => {
    const { oldName, newName } = req.body;

    if (!oldName || !newName) {
        return res.status(400).json({ message: 'Old name and new name are required.' });
    }

    try {
        const newFilePath = await imageRenamer.renameImage(oldName, newName);
        res.status(200).json({
            message: 'Image renamed successfully.',
            newFilePath: newFilePath
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/professors/uploadImg', async (req, res) => {
    try {
        imageUploader.uploadImage(req, res);
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Internal server error during image upload.', error: error.message });
    }
});
router.post('/professors/removeImg', async (req, res) => {
    try {
        imageRemover.removeImage(req, res);
    } catch (error) {
        console.error('Remove error:', error);
        res.status(500).json({ message: 'Internal server error during image remove.', error: error.message });
    }
});
router.post('/professors/insertProfessorData', async (req, res) => {
    try {
        const result = await professorDB.insertProfessorData(req.body);
    } catch (error) {
        console.error('Professor Insert Error:', error);
        res.status(500).json({ message: 'Internal server error during image upload.', error: error.message });
    }
});
router.delete('/professors/deleteProfessorData', async (req, res) => {
    const { professorName } = req.body;
    try {
        const result = await professorDB.deleteProfessorData(professorName);
        res.json(result);
    } catch (error) {
        console.error('Professor delete Error:', error);
        res.status(500).json({ message: 'Internal server error during image deletion.', error: error.message });
    }
});
router.patch('/professors/updateProfessorData', async (req, res) => {
    const { professorData, originalName } = req.body;
    try {
        const result = await professorDB.updateProfessorData(professorData, originalName);
        res.json(result);
    }
    catch (error) {
        console.error('Professor update Error:', error);
        res.status(500).json({ message: 'Internal server error during image deletion.', error: error.message });
    }
});
router.patch('/professors/updateBookData', async (req, res) => {
    const { professorName, bookArray } = req.body;
    const result = await professorDB.updateBookData(professorName, bookArray);
    res.json(result);
});
router.patch('/professors/updateArticleData', async (req, res) => {
    const { professorName, articleArray } = req.body;
    const result = await professorDB.updateArticleData(professorName, articleArray);
    res.json(result);
});
router.patch('/professors/updateAwardData', async (req, res) => {
    const { professorName, awardArray } = req.body;
    const result = await professorDB.updateAwardData(professorName, awardArray);
    res.json(result);
});
router.patch('/professors/updateCertData', async (req, res) => {
    const { professorName, certArray } = req.body;
    const result = await professorDB.updateCertData(professorName, certArray);
    res.json(result);
});
//session routes
router.post('/session/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send({ error: 'Username or password missing in request body' });
    }
    try {
        const isValid = await loginDB.isValidUser(username, password);
        if (isValid) {
            const result = await loginDB.logIntoSystem(username, password);
            return res.json(result);
        }
        else res.status(510).send({ error: 'Invalid User' });
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.post('/session/logout', async (req, res) => {
    const { username } = req.body;
    try {
        const result = await loginDB.sessionDestroyer(username);
        return res.json(result);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.post('/session/verify', async (req, res) => {
    const { username } = req.body;
    try {
        const result = await loginDB.sessionVerify(username);
        res.json({ success: true });
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.post('/session/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await loginDB.registerUser(username, password);
        console.log('result:', result);
        res.json(result);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


module.exports = router;
