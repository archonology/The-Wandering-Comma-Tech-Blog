const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const dashBoardRoutes = require('./dashBoardRoutes');
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/', dashBoardRoutes);
router.use('/api', apiRoutes);

module.exports = router;
