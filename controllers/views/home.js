module.exports = async (req, res) => {
    res.render('home', { 
        title: 'TuneStack | Home',
        loggedIn: req.session.loggedIn
    });
};