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
                    'username',
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

//Get dashboard -- must be logged in
//the dashboard needs to be by user id.. how?
router.get('/dashboard', async (req, res) => {
    try {
        const dbBlogData = await Blog.findAll({
            attributes: { exclude: ['password'] },
            include: [
                {
                  model: User,
                  attributes: [
                    'id',
                    'username',
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

        res.render('dashboard', { blogs, loggedIn: req.session.loggedIn,});
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


module.exports = router;