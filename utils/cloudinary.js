require('dotenv').config();

let cloudinaryWidget = cloudinary.createUploadWidget(
    {
    cloudName: process.env.CLOUD_NAME, 
    uploadPreset: process.env.UPLOAD_PRESET, 
    folder: process.env.CLOUD_FOLDER, 
    // cropping: true
    }, 
    (error, result) => { 
        console.log(error, result) 
    }
);

document.getElementById('upload_widget').addEventListener('click', function() {
    cloudinaryWidget.open();
}, false);