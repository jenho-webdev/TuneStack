module.exports = async (req, res) => {
    // TODO: If user is logged out, redirect to login page

    // TODO: Get 10 most recent album uploads

    // Render home page and pass data to view
    res.render('pages/home', { 
        page: 'Home',                   // Page title
        css: '/css/pages/home.css',     // Page stylesheet path
        loggedIn: req.session.loggedIn, // Logged in status
    });
};