const router = require('express').Router();

// View Controllers
const viewCtrl = {
    dashboard: require('../controllers/dashboard'),
    login: require('../controllers/login'),
    signUp: require('../controllers/signup')
};

// View Controller Routes
router
    .get('/', viewCtrl.dashboard)
    .get('/login', viewCtrl.login)
    .get('/signup', viewCtrl.signUp);

module.exports = router;
