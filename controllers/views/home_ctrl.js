//// const Album = require('../../models/album');

module.exports = async (req, res) => {
    try {
        // If user is logged out, redirect to login page
        if(!req.session.loggedIn) {
            res.redirect('/login');
        }

        // Get 10 latest album uploads
        //// const albums = await Album.find({}).sort({ createdAt: -1 }).limit(10);

        // Render home page and pass data to view
        res.render('pages/home', { 
            page: 'Home',                   // Page title
            css: '/css/pages/home.css',     // Page stylesheet path
            loggedIn: req.session.loggedIn, // Logged in status
            //// albums: albums,            // 10 most recent album uploads
        });
    
    } catch (err) {
        res.status(500).json({ error: 'Failed to load Home page' });
    }
};