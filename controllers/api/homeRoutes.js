const router = require('express').Router();
const { User, Blog } = require('../../models');
const withAuth = require('../../utils/auth');
 
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await Blog.findAll({
        include: [
            {
                model: Blog,
                attributes: ['id', 'title', 'post', 'user_id', 'date_created'],       
            },
            {
                model: User,
                attributes: ['id', 'name', 'email', 'password'],       
            },
        ]
    });

    // const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      logged_in: req.session.logged_in,
    });
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