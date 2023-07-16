const router = require('express').Router();

// Sub-routers
router.use('/api', require('./api_router'));
router.use('/', require('./views_router'));

module.exports = router;
