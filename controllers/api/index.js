const router = require('express').Router();
const homeRoutes = require('../homeRoutes');
const blogRoutes = require('./blogRoutes');
const commentRoutes = require('./commentRoutes');
const userRoutes = require('./userRoutes');


router.use('/', homeRoutes);
router.use('/blog', blogRoutes);
router.use('/comment', commentRoutes);
router.use('/users', userRoutes);

module.exports = router;
