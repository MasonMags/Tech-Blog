const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-route')
const profileRoutes = require('./profile-route')

router.use('/api', apiRoutes);
router.use('/profile', profileRoutes)
router.use('/', homeRoutes);

module.exports = router;