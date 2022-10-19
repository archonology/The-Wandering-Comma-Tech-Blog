const router = require("express").Router();
const { Blog, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//GET all blog posts to view API (api/posts)
router.get("/", async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
      include: [{ model: User }, { model: Comment }],
    });

    res.status(200).json(dbBlogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET one blog
router.get('/:id', async (req, res) => {
  try {
    const dbBlogData = await Blog.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment },],
    });

    req.session.save(() => {
      req.session.blog_id = dbBlogData.id;
    });

    // const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));
    res.status(200).json(dbBlogData);
    // res.render('dashboard', { blogs, loggedIn: req.session.loggedIn,});
  } catch (err) {
    res.status(500).json(err);
  }
});

//POST route for the views
router.post("/", async (req, res) => {
  console.log(req.body);
  console.log(req.session);
  try {
    const dbBlogData = await Blog.create({
      title: req.body.title,
      post: req.body.post,
      user_id: req.session.user_id,
    });

    res.status(200).json(dbBlogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE route for the views
router.put("/", async (req, res) => {
  console.log(req.body);
  console.log(req.session);
  try {
    const dbBlogData = await Blog.update( {
      where: {
        id: req.session.blog_id,
      },

      title: req.body.title,
      post: req.body.post,
      user_id: req.session.user_id,

    });

    res.status(200).json(dbBlogData);

  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE route for the views
router.delete("/:id", async (req, res) => {
  try {
    const dbBlogData = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(dbBlogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
