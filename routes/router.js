const router = require('express').Router();

// View Controllers
const viewCtrl = {
    home: require('../controllers/views/home'),
    login: require('../controllers/views/login'),
    signUp: require('../controllers/views/signup')
};

// View Controller Routes
router
    .get('/', viewCtrl.home)
    .get('/login', viewCtrl.login)
    .get('/signup', viewCtrl.signUp);

module.exports = router;
