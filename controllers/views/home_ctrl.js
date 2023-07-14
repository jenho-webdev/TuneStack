module.exports = async (req, res) => {
    try {
        // If user is logged out, redirect to login page
        if(!req.session.loggedIn) {
            res.redirect('/login');
        }

        // TODO: Get 10 most recent album uploads

        // Render home page and pass data to view
        res.render('pages/home', { 
            page: 'Home',                   // Page title
            css: '/css/pages/home.css',     // Page stylesheet path
            loggedIn: req.session.loggedIn, // Logged in status
        });
    
    } catch (err) {
        res.status(500).json({ error: 'Failed to load Home page' });
    }
};
