const router = require('express').Router();
const Post = require('../models/Post')
const Comment = require('../models/Comment');
const User = require('../models/User')
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
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
    const posts = postData.map((postData) => 
    postData.get({ plain:true })
    );
    console.log(post)
    
    res.render('homepage', {
      posts, logged_in: req.session.logged_in
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

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/post/:id', async (req, res) =>{
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
  const singlePost = postData.get({ plain: true })
  res.render('single-post', { singlePost, loggedIn: req.session.loggedIn});
} catch (err) {
  console.log(err)
  res.status(500).json(err)
}
})


module.exports = router