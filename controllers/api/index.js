const router = require('express').Router();
const postsRoute = require('./postsRoute');
const commentRoutes = require('./commentRoutes');
const userRoutes = require('./userRoutes');


router.use('/posts', postsRoute);
router.use('/comments', commentRoutes);
router.use('/users', userRoutes);

module.exports = router;
