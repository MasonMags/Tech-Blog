const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
       const commentData = await Comment.findAll({})
       res.status(200).json(commentData)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
      }
})

router.post('/', withAuth, async (req, res) => {
    try { 
        const newComment = await Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id
    })
    res.status(200).json(newComment);
} catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
  });