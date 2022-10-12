const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

//GET all blog posts by User
router.get('/:id', async (req, res) => {
    try {
        const dbBlogData = await Blog.findAll(req.params.id, {
            attributes: ['id', 'title', 'post', 'date_created'],
            include: [{ model: User }, { model: Comment }, { model: commentTag }],
        });

        const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));

        res.render('dashboard', { blogs, loggedIn: req.session.loggedIn,});
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET all specific info (/api/users/:?)
router.get('/:id', async (req, res) => {
    try {
      const dbUserData = await User.findByPk(req.params.id,{
        include: [{ model: Blog }, { model: Comment }],
      });

      const users = dbUserData.map((user) => user.get({ plain: true }));

      res.render('dashboard', { users, loggedIn: req.session.loggedIn,});
  } catch (err) {
      res.status(500).json(err);
  }
  });

module.exports = router;