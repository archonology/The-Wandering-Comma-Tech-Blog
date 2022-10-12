const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');

//GET all blog posts to view API (api/posts)
router.get('/', async (req, res) => {
  try {
      const dbBlogData = await Blog.findAll({
          include: [{ model: User }, { model: Comment }],
      });

      res.status(200).json(dbBlogData);
  } catch (err) {
      res.status(500).json(err);
  }
});

//GET a single post
router.get('/posts/:id', async (req, res) => {
  try {
      const dbBlogData = await Blog.findByPk(req.params.id, {
          include: [{ model: User }, { model: Comment }],
        });

      const blogs = dbBlogData.get({ plain: true });
      // res.status(200).json(dbBlogData);
      res.render('posts', { blogs, loggedIn: req.session.loggedIn,});
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;
