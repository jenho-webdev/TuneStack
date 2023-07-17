module.exports = async (req, res) => {
    try {
        // If user is logged out, redirect to login page
        if(!req.session.logged_in) {
            res.redirect('/login');
        }

        res.render('pages/404', { 
            page: '404',                        // Page title
            css: '/css/pages/404.css',          // Page stylesheet path
            loggedIn: req.session.logged_in,    // Logged in status
            id: req.session.user_id,            // User id
        });
    
    } catch (err) {
        res.status(500).json({ error: 'Failed to load 404 page' });
    }
};