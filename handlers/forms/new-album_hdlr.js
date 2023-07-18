const newAlbum = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const art = document.querySelector('#cloudinary_url').value.trim();
    const url = document.querySelector('#external_link').value.trim();
    const year = document.querySelector('#year').value.trim();
    const artist = document.querySelector('#artist').value.trim();
    const genre = document.querySelector('#genre').value.trim();
    const description = document.querySelector('#description').value.trim();

    // Send album info in a POST request to create a new album
    if (title && artist && year && genre && description) {
        const response = await fetch('/api/albums', {
            method: 'POST',
            body: JSON.stringify({ title, art, url, year, artist, genre, description }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');     // Redirect user to home page
        } else {
            alert('Failed to create album.');   // Alert user that album creation failed
        }
    }
};

document.querySelector('#new-album-form').addEventListener('submit', newAlbum);