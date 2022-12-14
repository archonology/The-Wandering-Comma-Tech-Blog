const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      //saves the session data for tagging posts and comments in other routes
      req.session.user_id = dbUserData.id;
      req.session.user_name = dbUserData.username;


      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//GET all user info (/api/users)
router.get('/', async (req, res) => {
  try {
    const dbUserData = await User.findAll({
      include: [{ model: Blog }, { model: Comment }],
    });

    res.status(200).json(dbUserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET all specific info (/api/users/:?)
router.get('/:id', async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.params.id,{
      include: [{ model: Blog }, { model: Comment }],
    });

    res.status(200).json(dbUserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      //save the user id
      req.session.user_id = dbUserData.id;
      req.session.user_name = dbUserData.username;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
