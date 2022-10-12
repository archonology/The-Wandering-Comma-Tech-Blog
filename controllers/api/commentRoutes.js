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

  module.exports = router;