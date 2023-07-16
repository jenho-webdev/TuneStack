module.exports = async (req, res) => {
    try {
        // If user is logged in, redirect to home page
        if(req.session.logged_in) {
            res.redirect('/');
        }

        // Render login page and pass data to view
        res.render('pages/login', { 
            page: 'Login',                  // Page title
            css: '/css/pages/login.css',    // Page stylesheet path
        });

    } catch (err) {
        res.status(500).json({ error: 'Failed to load Login page' });
    }
};