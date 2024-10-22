const path = require('path');
const fs = require('fs');

class ImageRenamer {
    constructor(uploadDirectory) {
        this.uploadDirectory = uploadDirectory || path.join(__dirname, '../frontend/assets/images/staff');

        // Ensure the upload directory exists
        if (!fs.existsSync(this.uploadDirectory)) {
            fs.mkdirSync(this.uploadDirectory, { recursive: true });
        }
    }

    /**
     * Rename an image by finding it in the directory and renaming it.
     * @param {string} oldName - The original name of the image (e.g., 'john_doe.png').
     * @param {string} newName - The new name for the image (e.g., 'john_smith.png').
     * @return {Promise} - Resolves with the new file path or rejects with an error.
     */
    renameImage(oldName, newName) {
        return new Promise((resolve, reject) => {
            // Format the old and new file names with the correct extensions
            const oldFilePath = path.join(this.uploadDirectory, oldName);
            const newFilePath = path.join(this.uploadDirectory, newName);

            // Check if the old file exists
            fs.access(oldFilePath, fs.constants.F_OK, (err) => {
                if (err) {
                    return reject(new Error(`File ${oldName} not found.`));
                }

                // Rename the file
                fs.rename(oldFilePath, newFilePath, (err) => {
                    if (err) {
                        return reject(new Error(`Error renaming file from ${oldName} to ${newName}: ${err.message}`));
                    }

                    // Resolve with the new file path
                    resolve(newFilePath);
                });
            });
        });
    }
}

module.exports = new ImageRenamer();
