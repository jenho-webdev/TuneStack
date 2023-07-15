const router = require('express').Router();

// View Controllers
const viewCtrl = {
    home: require('../controllers/views/home_ctrl'),
    login: require('../controllers/views/login_ctrl'),
    signUp: require('../controllers/views/signup_ctrl'),
    error404: require('../controllers/views/404_ctrl')
};

// View Controller Routes
router
    .get('/', viewCtrl.home)
    .get('/login', viewCtrl.login)
    .get('/signup', viewCtrl.signUp)
    .get('*', viewCtrl.error404);

module.exports = router;
