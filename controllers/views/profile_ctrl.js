const { User, Favorite, Album } = require('../../models');

module.exports = async (req, res) => {
    try {
        // If user is logged out, redirect to login page
        if(!req.session.logged_in) {
            res.redirect('/login');
            return;
        }

        // Get album info
        const user = await User.findByPk(req.params.id);

        // Get all favorites for user
        const favorites = await Favorite.findAll({
            where: {
                user_id: req.params.id
            }
        });

        // Get all album info for each favorite
        for (let i = 0; i < favorites.length; i++) {
            favorites[i].dataValues.album = await Album.findByPk(favorites[i].dataValues.album_id);

            // Mark all as favorited albums
            favorites[i].dataValues.isFavorited = true;
        }

        // If album cloudinary_url is null or has "https://example.com/" in it's path name, replace with default image path
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].dataValues.album.dataValues.cloudinary_url === '' || favorites[i].dataValues.album.dataValues.cloudinary_url.includes('https://example.com/')) {
                favorites[i].dataValues.album.dataValues.cloudinary_url = '/img/album.svg';
            }
        }

        // If album title is longer than 30 characters, limit to 30 characters and add ellipsis (ex. Bowie's Ziggy Stardust album)
        for (let i = 0; i < favorites.length; i++) {
            const title = favorites[i].dataValues.album.dataValues.title;
            if (title.length > 30) {
                favorites[i].dataValues.album.dataValues.title = title.slice(0, 30);                            // Limit to 30 characters
                const lastCharacter = favorites[i].dataValues.album.dataValues.title.charAt(29);                // Get last character
                if (lastCharacter === ' ') {
                    favorites[i].dataValues.album.dataValues.title = favorites[i].dataValues.album.dataValues.title.slice(0, 29);   // Remove space if last character is a space
                }
                favorites[i].dataValues.album.dataValues.title += '...'; // Add ellipsis
            }
        }

        // Render home page and pass data to view
        res.render('pages/profile', { 
            page: user.dataValues.username,     // Page title
            css: '/css/pages/profile.css',      // Page stylesheet path
            loggedIn: req.session.logged_in,    // Logged in status
            id: req.session.user_id,            // User id
            user: user,                         // Album data
            favorites: favorites,               // User's favorites
        });
    
    } catch (err) {
        res.status(500).json({ error: 'Failed to load User page' });
    }
};