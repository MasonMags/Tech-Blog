const router = require('express').Router();
const User = require('../../models/User');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
 try{
    const userData = await User.findAll({
        attributes: { exclude: ['password']}
    })
    res.status(200).json(userData);
} catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.get('/:id', (req, res) => {
 try {
    const userData = User.findOne({
        attributes: { exclude: ['password']},
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_text', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                  model: Post,
                  attributes: ['title']
                }
            }
        ]
    })
    res.status(200).json(userData);
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
      }
});
