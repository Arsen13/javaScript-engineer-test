const multer = require('multer');
const cloudinary = require('./cloudinary');

const storage = multer.memoryStorage();

const uploadToCloudinary = async (file) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({ folder: "hero_pics" }, (error, result) => {
            if (result) {
                resolve(result);
            } else {
                reject(error);
            }
        });

        if (file && file.buffer) {
            uploadStream.end(file.buffer);
        } else {
            reject(new Error("File buffer is undefined"));
        }
    });
};

const deleteFromCloudinary = async (publicId) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, (error, result) => {
            if (result) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};

module.exports = { storage, uploadToCloudinary, deleteFromCloudinary };