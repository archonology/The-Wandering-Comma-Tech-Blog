const router = require('express').Router();
const { User, Blog } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const dbBlogData = await Blog.findAll({
            attributes: ['title', 'post', 'date_created'],
        });

        const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));

        res.render('homepage', { blogs, logged_in: req.session.logged_in,});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;