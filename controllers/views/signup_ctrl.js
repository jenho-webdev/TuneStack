module.exports = async (req, res) => {
    try {
        // If user is logged in, redirect to home page
        if(req.session.loggedIn) {
            res.redirect('/');
        }
        
        // Render sign up page and pass data to view
        res.render('pages/signup', { 
            page: 'Sign Up',                // Page title
            css: '/css/pages/login.css',    // Page stylesheet path
        });

    } catch (err) {
        res.status(500).json({ error: 'Failed to load Sign Up page' });
    }
};