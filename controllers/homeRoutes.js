const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

//GET all blog posts
router.get('/', async (req, res) => {
    try {
        const dbBlogData = await Blog.findAll({
            attributes: { exclude: ['password'] },
            include: [
                {
                  model: User,
                  attributes: [
                    'id',
                    'name',
                  ],
                },
                {
                    model: Comment,
                    attributes: [
                      'comment',
                      'date_created',
                    ],
                  },
              ],
        });

        const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));

        res.render('homepage', { blogs, loggedIn: req.session.loggedIn,});
    } catch (err) {
        res.status(500).json(err);
    }
});


//GET all blog posts
router.get('/', async (req, res) => {
    try {
        const dbBlogData = await Blog.findAll({
            attributes: { exclude: ['password'] },
            include: [
                {
                  model: User,
                  attributes: [
                    'id',
                    'name',
                  ],
                },
                {
                    model: Comment,
                    attributes: [
                      'comment',
                      'date_created',
                    ],
                  },
              ],
        });

        const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));

        res.render('homepage', { blogs, loggedIn: req.session.loggedIn,});
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET the login/signup page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

//GET the dashboard ONLY if logged in
router.get('/dashboard', async (req, res) => {
    try {
        const dbBlogData = await Blog.findAll({
            attributes: { exclude: ['password'] },
            include: [
                {
                  model: User,
                  attributes: [
                    'id',
                    'name',
                  ],
                },
                {
                    model: Comment,
                    attributes: [
                      'comment',
                      'date_created',
                    ],
                  },
              ],
        });

        const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));

        res.render('homepage', { blogs, loggedIn: req.session.loggedIn,});
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

        // const blogs = dbBlogData.get({ plain: true });
        res.status(200).json(dbBlogData);
        // res.render('posts', { blogs, loggedIn: req.session.loggedIn,});
    } catch (err) {
        res.status(500).json(err);
    }
});
// //GET all Comments
// router.get('/posts/:id', async (req, res) => {
//     try {
//         const dbCommentData = await Comment.findAll({
//             attributes: ['id', 'comment', 'user_id', 'date_created'],
//             include: [
//                 {
//                   model: Blog,
//                   attributes: [
//                     'id',
//                   ],
//                 },
//                 {
//                   model: User,
//                   attributes: [
//                     'id',
//                     'name',
//                   ],
//                 },
//               ],
//         });

//         const comments = dbBlogData.map((comment) => comment.get({ plain: true }));

//         res.render('posts', { comments, loggedIn: req.session.loggedIn,});
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

//Get dashboard -- must be logged in
router.get('/dashboard/:id', async (req, res) => {
    try {
        const dbBlogData = await Blog.findByPk(req.params.id, {
            attributes: ['id', 'title', 'post', 'user_id', 'date_created'],
        });

        const blogs = dbBlogData.get({ plain: true });

        res.render('dashboard', { blogs, loggedIn: req.session.loggedIn,});
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;