module.exports = async (req, res) => {
    try {
        // If user is logged out, redirect to login page
        if(!req.session.logged_in) {
            res.redirect('/login');
        }

        // Render home page and pass data to view
        res.render('pages/new-album', { 
            page: 'Add New Album',              // Page title
            css: '/css/pages/new-album.css',    // Page stylesheet path
            loggedIn: req.session.logged_in,    // Logged in status
            id: req.session.user_id,            // User id
        });
    
    } catch (err) {
        res.status(500).json({ error: 'Failed to load New Album page' });
    }
};