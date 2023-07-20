const favorite = async (event) => {
    event.preventDefault();

    const favoriteButton = event.target;
    const albumId = favoriteButton.dataset.id;

    try {
        const response = await fetch(`/api/favorites`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
            body: JSON.stringify({ album_id: albumId }),
        });

        if (!response.ok) {
            throw new Error("Failed to add favorite.");
        }

        // TODO: show album is favorited
        // TODO:favoriteButton.classList.add("favorited");
    } catch (err) {
        console.error(err);
    }
};

// Get all the "favorite" buttons
const favoriteButtons = document.querySelectorAll(".favorite-button");

// For each button, attach the click event handler
favoriteButtons.forEach((button) => {
    button.addEventListener("click", favorite);
});