// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// class ImageUploader {
//     constructor(uploadDirectory) {
//         this.uploadDirectory = uploadDirectory || path.join(__dirname, '../frontend/assets/images/staff');

//         if (!fs.existsSync(this.uploadDirectory)) {
//             fs.mkdirSync(this.uploadDirectory, { recursive: true });
//         }

//         this.storage = multer.diskStorage({
//             destination: (req, file, cb) => {
//                 cb(null, this.uploadDirectory); // Save files to upload directory
//             },
//             filename: (req, file, cb) => {
//                 const originalName = file.originalname;
//                 const extension = path.extname(originalName);  // Extract the file extension
//                 const baseName = path.basename(originalName, extension);  // Extract the base name

//                 let fileName = originalName;
//                 let filePath = path.join(this.uploadDirectory, fileName);
//                 let counter = 1;

//                 while (fs.existsSync(filePath)) {
//                     fileName = `${baseName}_${counter}${extension}`;  // Append a counter to the file name
//                     filePath = path.join(this.uploadDirectory, fileName);
//                     counter++;
//                 }

//                 // Once a unique file name is generated, call the callback
//                 cb(null, fileName);
//             }
//         });

//         // Initialize multer with the storage engine
//         this.upload = multer({ storage: this.storage });
//     }

//     uploadImage(req, res) {
//         const singleUpload = this.upload.single('image'); // 'image' is the field name
//         singleUpload(req, res, (err) => {
//             if (err) {
//                 return res.status(500).send({
//                     message: 'Error uploading the image.',
//                     error: err.message
//                 });
//             }

//             if (!req.file) {
//                 return res.status(400).send({
//                     message: 'No file uploaded.'
//                 });
//             }

//             const uploadedFilePath = `/uploads/${req.file.filename}`; // Path to the uploaded file

//             res.status(200).send({
//                 message: 'Image uploaded successfully.',
//                 filePath: uploadedFilePath
//             });
//         });
//     }

// }
// module.exports = new ImageUploader();

const multer = require('multer');
const path = require('path');
const fs = require('fs');

class ImageUploader {
    constructor(uploadDirectory) {
        this.uploadDirectory = uploadDirectory || path.join(__dirname, '../frontend/assets/images/staff');

        // Ensure the upload directory exists
        if (!fs.existsSync(this.uploadDirectory)) {
            fs.mkdirSync(this.uploadDirectory, { recursive: true });
        }

        // Multer storage configuration to overwrite existing files
        this.storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, this.uploadDirectory);  // Save files to upload directory
            },
            filename: (req, file, cb) => {
                console.log('file:', file);
                // Create a file name based on the original file name (overwrites if exists)
                // const professorName = file.originalname  // Format professor's name
                // const extension = path.extname(file.originalname);  // Extract the file extension
                // const newFileName = `${professorName}${extension}`; // Create a consistent file name

                cb(null, file.originalname);  // Save the file with the same name to overwrite if exists
            }
        });

        // Initialize multer with the storage engine
        this.upload = multer({ storage: this.storage });
    }

    uploadImage(req, res) {
        const singleUpload = this.upload.single('image');  // 'image' is the field name
        singleUpload(req, res, (err) => {
            if (err) {
                return res.status(500).send({
                    message: 'Error uploading the image.',
                    error: err.message
                });
            }

            if (!req.file) {
                return res.status(400).send({
                    message: 'No file uploaded.'
                });
            }

            const uploadedFilePath = `/uploads/${req.file.filename}`;  // Path to the uploaded (and possibly overwritten) file

            res.status(200).send({
                message: 'Image uploaded successfully.',
                filePath: uploadedFilePath
            });
        });
    }
}

module.exports = new ImageUploader();
