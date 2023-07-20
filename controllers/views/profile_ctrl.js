const { User, Favorite, Album } = require('../../models');

module.exports = async (req, res) => {
    try {
        // If user is logged out, redirect to login page
        if(!req.session.logged_in) {
            res.redirect('/login');
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