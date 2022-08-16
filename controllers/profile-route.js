const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

router.get('/', withAuth, async (req, res) => {
   try {
   const postData = await Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'post_text',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes:  ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
    const posts = postData.get({ plain: true })
    res.render('profile', {posts, logged_in: true })
} 
catch (err) {
    console.log(err)
    res.status(500).json(err)
  }  
});

router.get('/edit/:id', async (req, res) =>{
    try {
      const editPostData = await Post.findOne({
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
    const editPost = editPostData.get({ plain: true })
    res.render('edit-post', { editPost, loggedIn: req.session.loggedIn});
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
  })