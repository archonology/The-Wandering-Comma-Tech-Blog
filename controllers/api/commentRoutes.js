const router = require('express').Router();
const { Comment, Blog, User } = require('../../models');

//GET all comments (/api/comment)
router.get('/', async (req, res) => {
    try {
        const dbCommentData = await Comment.findAll({
            // attributes: ['id', 'title', 'post', 'date_created'],
            include: [{ model: User }, { model: Blog }],
        });
  
        res.status(200).json(dbCommentData);
    } catch (err) {
        res.status(500).json(err);
    }
  });

//GET Comments
router.get('/posts', async (req, res) => {
    try {
        const dbBlogData = await Comment.findAll({
            attributes: ['id', 'comment', 'blog_id', 'date_created'],
            include: [
                {
                  model: Blog,
                  attributes: [
                    'id',
                  ],
                },
              ],
        });

        const comments = dbBlogData.map((comment) => comment.get({ plain: true }));

        res.render('post', { comments, loggedIn: req.session.loggedIn,});
    } catch (err) {
        res.status(500).json(err);
    }
});

//POST a new comment
router.post('/dashboard', async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  module.exports = router;