const router = require('express').Router();
const { Comment, Blog, User } = require('../../models');

//GET all comments (/api/comment)
router.get('/', async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll({
      // attributes: ['id', 'title', 'post', 'date_created'],
      include: [{ model: User }, { model: Blog }],
    });

    res.status(200).json(dbCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET one comment
router.get('/:id', async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll(req.params.id, {
      attributes: ['id', 'title', 'post', 'date_created'],
      include: [{ model: User }, { model: Blog },],
    });

    res.status(200).json(dbCommentData);

  } catch (err) {
    res.status(500).json(err);
  }
});

//POST route for the comments
router.post("/", async (req, res) => {
  console.log(req.body);
  console.log(req.session);
  try {
    const dbCommentData = await Comment.create({
      user_id: req.session.user_id,
      comment: req.body.comment,
      username: req.session.user_name,
      blog_id: Number(req.body.blog_id),
    });

    res.status(200).json(dbCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;