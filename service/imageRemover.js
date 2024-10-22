const path = require('path');
const fs = require('fs');

class ImageRemover {
    constructor(uploadDirectory) {
        // Set the upload directory, or default to the staff images directory
        this.uploadDirectory = uploadDirectory || path.join(__dirname, '../frontend/assets/images/staff');

        // Ensure the upload directory exists
        if (!fs.existsSync(this.uploadDirectory)) {
            fs.mkdirSync(this.uploadDirectory, { recursive: true });
        }
    }

    /**
     * Format the professor's name to match the image file name
     * (e.g., "John Doe" becomes "john_doe.png")
     */
    formatImageName(professorName, extension = '.png') {
        return `${professorName.toLowerCase().replace(/\s+/g, '_')}${extension}`;
    }

    /**
     * Remove an image by professor name
     */
    removeImage(req, res) {
        // Get the professor's name from the request (could be passed as a query param or body)
        const professorName = req.body.fullName;

        if (!professorName) {
            return res.status(400).send({
                message: 'No professor name provided.'
            });
        }

        // Format the professor's name to match the image file name
        const formattedImageName = this.formatImageName(professorName);

        // Construct the full path to the image file
        const filePath = path.join(this.uploadDirectory, formattedImageName);

        // Check if the file exists
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                return res.status(404).send({
                    message: 'File not found.'
                });
            }

            // If the file exists, remove it
            fs.unlink(filePath, (err) => {
                if (err) {
                    return res.status(500).send({
                        message: 'Error removing the image.',
                        error: err.message
                    });
                }

                // Send success response
                res.status(200).send({
                    message: 'Image removed successfully.',
                    filePath: `/uploads/${formattedImageName}`  // Return the path for reference
                });
            });
        });
    }
}


module.exports = new ImageRemover();
