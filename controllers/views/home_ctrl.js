const { Album, Favorite } = require('../../models');

module.exports = async (req, res) => {
    try {
        // If user is logged out, redirect to login page
        if(!req.session.logged_in) {
            res.redirect('/login');
            return;
        }

        // Get 10 (max) most recent album uploads
        const albums = await Album.findAll({
            limit: 10,
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