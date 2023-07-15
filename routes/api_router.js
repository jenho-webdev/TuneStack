const router = require('express').Router();

// API Controllers
const apiCtrl = {
    user: require('../controllers/api/user_ctrl'),
    album: require('../controllers/api/album_ctrl'),
    favorites: require('../controllers/api/favorites_ctrl')
};

// API Controller Routes
router
    .use('/users', apiCtrl.user)
    .use('/albums', apiCtrl.album)
    .use('/favorites', apiCtrl.favorites);

module.exports = router;