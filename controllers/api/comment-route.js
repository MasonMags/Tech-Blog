const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth.js');

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
            post_id: req.body.post_id,
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
    })
    res.status(200).json(newComment);
} catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
  });

  router.delete('/:id', withAuth, async (req, res) => {
    const deletedComment = await Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json(deletedComment);
})

module.exports = router;