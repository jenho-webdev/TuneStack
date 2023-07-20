const { Album } = require('../../models');

module.exports = async (req, res) => {
    try {
        // If user is logged out, redirect to login page
        if(!req.session.logged_in) {
            res.redirect('/login');
            return;
        }

        // Get album info
        const album = await Album.findByPk(req.params.id);

        // Render home page and pass data to view
        res.render('pages/album', { 
            page: album.dataValues.title,       // Page title
            css: '/css/pages/album.css',        // Page stylesheet path
            loggedIn: req.session.logged_in,    // Logged in status
            id: req.session.user_id,            // User id
            album: album,                       // Album data
        });
    
    } catch (err) {
        res.status(500).json({ error: 'Failed to load Album page' });
    }
};