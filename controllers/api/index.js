const router = require('express').Router();
const userRoutes = require('./userRoutes');
const albumRoutes = require('./albumRoutes');
const favoriteRoutes = require('./favoriteRoutes');

router.use('/users', userRoutes);
router.use('/albums', albumRoutes);
router.use('/favorites', favoriteRoutes);

module.exports = router;
