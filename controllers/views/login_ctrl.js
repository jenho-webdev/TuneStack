module.exports = async (req, res) => {
    // TODO: If user is logged in, redirect to home page

    // Render login page and pass data to view
    res.render('pages/login', { 
        page: 'Login',                  // Page title
        css: '/css/pages/login.css',    // Page stylesheet path
    });
};