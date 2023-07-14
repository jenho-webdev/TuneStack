module.exports = async (req, res) => {
    // TODO: If user is logged in, redirect to home page
    
    // Render sign up page and pass data to view
    res.render('pages/signup', { 
        page: 'Sign Up',                // Page title
        css: '/css/pages/login.css',    // Page stylesheet path
    });
};