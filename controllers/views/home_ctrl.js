const { Album, Favorite } = require('../../models');

module.exports = async (req, res) => {
    try {
        // If user is logged out, redirect to login page
        if(!req.session.logged_in) {
            res.redirect('/login');
            return;
        }

        // Get all albums and sort by most recent
        const albums = await Album.findAll({
            order: [['createdAt', 'DESC']],
        });

        // Check which albums are in user's favorites and mark them as favorited
        for (let i = 0; i < albums.length; i++) {
            const favorite = await Favorite.findOne({
                where: {
                    user_id: req.session.user_id,
                    album_id: albums[i].dataValues.album_id,
                }
            });

            if (favorite) {
                albums[i].dataValues.isFavorited = true;
            }
        }

        // If album cloudinary_url is null or has "https://example.com/" in it's path name, replace with default image path
        for (let i = 0; i < albums.length; i++) {
            if (albums[i].dataValues.cloudinary_url === '' || albums[i].dataValues.cloudinary_url.includes('https://example.com/')) {
                albums[i].dataValues.cloudinary_url = '/img/album.svg';
            }
        }

        // If album title is longer than 30 characters, limit to 30 characters and add ellipsis (ex. Bowie's Ziggy Stardust album)
        for (let i = 0; i < albums.length; i++) {
            const title = albums[i].dataValues.title;
            if (title.length > 30) {
                albums[i].dataValues.title = title.slice(0, 30);                            // Limit to 30 characters
                const lastCharacter = albums[i].dataValues.title.charAt(29);                // Get last character
                if (lastCharacter === ' ') {
                    albums[i].dataValues.title = albums[i].dataValues.title.slice(0, 29);   // Remove space if last character is a space
                }
                albums[i].dataValues.title += '...';                                        // Add ellipsis
            }
        }

        // Render home page and pass data to view
        res.render('pages/home', { 
            page: 'Home',                       // Page title
            css: '/css/pages/home.css',         // Page stylesheet path
            loggedIn: req.session.logged_in,    // Logged in status
            id: req.session.user_id,            // User id
            albums: albums,                     // 10 most recent album uploads
        });
    
    } catch (err) {
        res.status(500).json({ error: 'Failed to load Home page' });
    }
};