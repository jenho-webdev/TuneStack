const { User } = require('../../models');

module.exports = async (req, res) => {
    try {
        // If user is logged out, redirect to login page
        if(!req.session.logged_in) {
            res.redirect('/login');
            return;
        }

        // Get album info
        const user = await User.findByPk(req.params.id);

        // Render home page and pass data to view
        res.render('pages/profile', { 
            page: user.dataValues.username,     // Page title
            css: '/css/pages/profile.css',      // Page stylesheet path
            loggedIn: req.session.logged_in,    // Logged in status
            id: req.session.user_id,            // User id
            user: user,                         // Album data
        });
    
    } catch (err) {
        res.status(500).json({ error: 'Failed to load User page' });
    }
};