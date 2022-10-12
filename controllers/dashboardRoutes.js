const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

//Get dashboard -- must be logged in
//the dashboard needs to be by user id.. how?
//GET all blog posts
// router.get('/dashboard', withAuth, async (req, res) => {
//   try {
//       const dbBlogData = await Blog.findAll({
//         where: {
//           id: 1
//         },
//           include: [
//               {
//                 model: User,
//                 attributes: [
//                   'id',
//                   'username',
//                 ],
//               },
//               {
//                   model: Comment,
//                   attributes: [
//                     'comment',
//                     'date_created',
//                   ],
//                 },
//             ],
//       });

//       const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));

//       res.render('dashboard', { blogs, loggedIn: req.session.loggedIn,});
//   } catch (err) {
//       res.status(500).json(err);
//   }
// });

//GET a single post and comment if logged in
router.get('/posts/:id', withAuth, async (req, res) => {
    try {
        const dbBlogData = await Blog.findByPk(req.params.id, {
            include: [{ model: User }, { model: Comment }],
          });

        const blogs = dbBlogData.get({ plain: true });
        // res.status(200).json(dbBlogData);
        res.render('posts/:id', { blogs, loggedIn: req.session.loggedIn,});
    } catch (err) {
        res.status(500).json(err);
    }
});

//POST a new blogpost
router.post('/posts', withAuth, async (req, res) => {
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

  //POST a new comment
router.post('/posts', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      // red.body needs: 
      // {
      //   user_id: 2,
      //   comment: "",
      //   username: ""
      // }
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

//UPDATE a blogpost
router.put('/posts/:id', withAuth, async (req, res) => {
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
 router.delete('/posts/:id', withAuth, async (req, res) => {
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