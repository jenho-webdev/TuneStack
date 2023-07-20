module.exports = async (req, res) => {
    try {
        // If user is logged in, redirect to home page
        if(req.session.logged_in) {
            res.redirect('/');
            return;
        }

        // Render login page and pass data to view
        res.render('pages/signup', { 
            page: 'Login',                  // Page title
            css: '/css/pages/login.css',    // Page stylesheet path
        });

    } catch (err) {
        res.status(500).json({ error: 'Failed to load Sign Up page' });
    }
};