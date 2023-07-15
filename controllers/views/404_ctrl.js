module.exports = async (req, res) => {
    try {
        res.render('pages/404', { 
            page: '404',                    // Page title
            css: '/css/pages/404.css',      // Page stylesheet path
            loggedIn: req.session.loggedIn, // Logged in status
            id: req.session.user_id,        // User id
        });
    
    } catch (err) {
        res.status(500).json({ error: 'Failed to load 404 page' });
    }
};