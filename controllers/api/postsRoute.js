const router = require('express').Router();
const { Blog, User, Comment, CommentTag } = require('../../models');

//GET all blog posts (api/posts)
router.get('/', async (req, res) => {
  try {
      const dbBlogData = await Blog.findAll({
          // attributes: ['id', 'title', 'post', 'date_created'],
          include: [{ model: User }, { model: Comment }],
      });

      // const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));
      res.status(200).json(dbBlogData);
      // res.render('dashboard', { blogs, loggedIn: req.session.loggedIn,});
  } catch (err) {
      res.status(500).json(err);
  }
});
//GET all blog posts and render
router.get('/', async (req, res) => {
  try {
      const dbBlogData = await Blog.findAll({
          include: [{ model: User }, { model: Comment }],
      });

      const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));
      res.render('dashboard', { blogs, loggedIn: req.session.loggedIn,});
  } catch (err) {
      res.status(500).json(err);
  }
});

//POST a new blogpost
router.post('/posts', async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    const blogPost = dbBlogData.map((blog) => blog.get({ plain: true }));
    
    if (!dbBlogData) {
      res.status(404).json({ message: 'No blogs found with this id!' });
      return;
    }

    res.status(200).json(dbBlogData);
    res.render('homepage', { blogPost, loggedIn: req.session.loggedIn,});
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE a blogpost
router.put('/posts/:id', async (req, res) => {
  try {
    const dbBlogData = await Blog.update({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));

    if (!dbBlogData) {
      res.status(404).json({ message: 'No blogs found with this id!' });
      return;
    }

    res.status(200).json(dbBlogData);
    res.render('homepage', { blogs, loggedIn: req.session.loggedIn,});
  } catch (err) {
    res.status(500).json(err);
  }
});


//DELETE a blogpost
const deletePost = router.delete('/posts/:id', async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blogs found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
