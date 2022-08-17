const router = require('express').Router();
const { Post, User, Comment} = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        attributes: ['id', 'title', 'post_text', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      });
      res.status(200).json(postData);
    } 
    catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  });

  router.get('/:id', async (req, res) =>{
    try {
      const postData = await Post.findOne({
      where: {
        id: req.params.id
      },
      attributes : [
        'id',
        'post_text',
        'title',
        'created_at'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    res.status(200).json(postData);
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
  });

  //creating a new post
  router.post('/', withAuth, async (req, res) => {
    try { 
        const newPost = await Post.create({
            title: req.body.title,
            post_text: req.body.post_text,
            user_id: req.session.user_id
    })
    res.status(200).json(newPost);
} catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
  });

  //updating a post
  router.put('/:id', withAuth, async (req, res) => {
    try{
        const postData = await Post.update({
            title: req.body.title,
            post_text: req.body.post_text
        },
        {
            where: {
              id: req.params.id
            }
        })
        if (!postData[0]) {
            res.status(404).json({ message: 'No post with this id!' });
            return;
          }
          res.status(200).json(postData);
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
      }
  });

router.delete('/:id', withAuth, async (req, res) => {
    const deletedData = await Post.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json(deletedData);
})

  module.export = router;