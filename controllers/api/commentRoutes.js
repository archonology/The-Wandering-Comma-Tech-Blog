const router = require('express').Router();
const { Comment, Blog, User } = require('../../models');
const withAuth = require('../../utils/auth');

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

//POST a new comment
router.post('/posts', withAuth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        // red.body needs: 
        // {
        //   user_id: 2,
        //   comment: "",
        //   username: ""
        // }
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  module.exports = router;