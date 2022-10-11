const router = require('express').Router();
const postsRoute = require('./postsRoute');
const commentRoutes = require('./commentRoutes');
const userRoutes = require('./userRoutes');
const dashRoutes = require('./dashBoardRoutes');


router.use('/posts', postsRoute);
router.use('/comment', commentRoutes);
router.use('/users', userRoutes);
router.use('/dash', dashRoutes);

module.exports = router;
