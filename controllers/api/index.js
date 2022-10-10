const router = require('express').Router();
const homeRoutes = require('../homeRoutes');
const blogRoutes = require('./blogRoutes');
const userRoutes = require('./userRoutes');


router.use('/', homeRoutes);
router.use('/blog', blogRoutes);
router.use('/user', userRoutes);

module.exports = router;
