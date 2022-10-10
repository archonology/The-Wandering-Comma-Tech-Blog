const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

//GET all blog posts by User
router.get('/dashboard/:id', async (req, res) => {
    try {
        const dbBlogData = await Blog.findAll(req.params.id, {
            attributes: ['id', 'title', 'post', 'date_created'],
        });

        const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));

        res.render('dashboard', { blogs, loggedIn: req.session.loggedIn,});
    } catch (err) {
        res.status(500).json(err);
    }
});