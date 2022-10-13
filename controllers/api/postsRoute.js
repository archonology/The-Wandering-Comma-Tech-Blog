const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

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

//POST route for the views
router.post('/', async (req, res) => {
  try {
      const dbBlogData = await Blog.create(req.body, {
          include: [{ model: User }, { model: Comment }],
          title: req.body.title,
          post: req.body.post,
          user_id: req.session.user_id,      
      });
    
      const blogs = dbBlogData.get({ plain: true });
      res.render('dashboard', { blogs, loggedIn: req.session.loggedIn,});
  } catch (err) {
      res.status(500).json(err);
  }
});

//POST route for the views
router.put('/:id', async (req, res) => {
  try {
      const dbBlogData = await Blog.update(req.body, {
          include: [{ model: User }, { model: Comment }],
          title: req.body.title,
          post: req.body.post,
          user_id: req.session.user_id,
          where: {
            id: req.params.id,
          },      
      });
    
      const blogs = dbBlogData.get({ plain: true });
      res.render('dashboard', { blogs, loggedIn: req.session.loggedIn,});
  } catch (err) {
      res.status(500).json(err);
  }
});

//DELETE route for the views
router.delete('/:id', async (req, res) => {
  try {
      const dbBlogData = await Blog.destroy(req.body, {
          include: [{ model: User }, { model: Comment }],
          title: req.body.title,
          post: req.body.post,
          user_id: req.session.user_id,
          where: {
            id: req.params.id,
          },      
      });
    
      const blogs = dbBlogData.get({ plain: true });
      res.render('dashboard', { blogs, loggedIn: req.session.loggedIn,});
  } catch (err) {
      res.status(500).json(err);
  }
});

//for testing api post directly
// router.post('/', async (req, res) => {
//   try {
//       const dbBlogData = await Blog.create( {
//           include: [{ model: User }, { model: Comment }],
//           // how the post must be added:
//           // {
//           //   "title": "Sample Post",
//           //   "post": "To see if it works",
//           //   "user_id": 2
//           // }
//       });

//       res.status(200).json(dbBlogData);
//   } catch (err) {
//       res.status(500).json(err);
//   }
// });


module.exports = router;
