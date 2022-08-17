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