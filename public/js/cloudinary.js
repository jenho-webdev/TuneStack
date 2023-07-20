// require('dotenv').config();

let cloudinaryWidget = cloudinary.createUploadWidget(
    {
        // cloudName: process.env.CLOUD_NAME, 
        // uploadPreset: process.env.UPLOAD_PRESET, 
        // folder: process.env.CLOUD_FOLDER, 
        cloudName: 'dx7bgdfut', 
        uploadPreset: 'TuneStack', 
        folder: 'TuneStack', 
    }, 
    (error, result) => { 
        console.log(error, result);
        if (!error && result && result.event === "success") {
            const url = result.info.secure_url; // Extract the URL from the response.
            document.getElementById('cloudinary_url').value = url; // Set the URL as the value of the 'url' field in the form. We will need to hide or grayout this part of the form.
            const uploadButton = document.getElementById('upload_widget');
            uploadButton.style.backgroundColor = 'lightgreen';
            uploadButton.style.pointerEvents = 'none';
            uploadButton.innerHTML = 'Upload Successful!';
        }
    }
);

document.getElementById('upload_widget').addEventListener('click', function() {
    cloudinaryWidget.open();
}, false);

