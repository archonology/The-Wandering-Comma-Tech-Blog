const router = require("express").Router();
const { User, Blog, Comment } = require("../models");
const withAuth = require("../utils/auth");

//GET the login/signup page
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

//GET all blog posts
router.get("/", async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
      attributes: { exclude: ["password"] },
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
        {
          model: Comment,
          attributes: ["comment", "date_created"],
        },
      ],
    });

    const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));

    res.render("homepage", { blogs, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get dashboard -- must be logged in
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
      where: {
        user_id: req.session.user_id,
      },

      attributes: { exclude: ["password"] },

      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
        {
          model: Comment,
          attributes: ["comment", "date_created"],
        },
      ],
    });

    const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));

    res.render("dashboard", { blogs, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/dashboard/newpost", async (req, res) => {
  if (req.session.loggedIn) {
    res.render("newPost");
    return;
  }
  res.redirect("/");
});

//GET one blog post
router.get("/:id", async (req, res) => {
  try {
    const dbBlogData = await Blog.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment }],
    });

    const blogs = dbBlogData.get({ plain: true });
    res.render("posts", { blogs, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});


//route for adding comment
router.get("/addcomment/:id", async (req, res) => {
  try {
    const dbBlogData = await Blog.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment }],
    });

    const blogs = dbBlogData.get({ plain: true });
    res.render("addcomment", { blogs, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET one of your single posts as a logged in user
router.get("/dashboard/userposts/:id", async (req, res) => {
  try {
    const dbBlogData = await Blog.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment }],
    });

    const blogs = dbBlogData.get({ plain: true });
    res.render("userposts", { blogs, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

//render UPDATE view for one of your single posts as a logged in user
router.get("/dashboard/updatepost/:id", async (req, res) => {
  try {
    const dbBlogData = await Blog.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment }],
    });

    const blogs = dbBlogData.get({ plain: true });
    res.render("updatepost", { blogs, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

//render DELETE view for one of your single posts as a logged in user
router.get("/dashboard/deletepost/:id", async (req, res) => {
  try {
    const dbBlogData = await Blog.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment }],
    });

    const blogs = dbBlogData.get({ plain: true });
    res.render("deletepost", { blogs, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
