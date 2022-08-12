const router = require('express').Router();
const Post = require('../models/Post')
const Comment = require('../models/Comment');
const User = require('../models/User')
const withAuth = require('../utils/auth')

router.get('/', (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ['id', 'title', 'post_text', 'created_at'],
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
    const post = postData.map((postData) => 
    postData.get({ plain:true })
    );
    console.log(post)
    
    res.render('homepage', {
      post, logged_in: req.session.logged_in
    });
  } 
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  console.log("login route")
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


module.exports = router