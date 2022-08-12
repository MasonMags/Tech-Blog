const router = require('express').Router();
const Post = require('../models/Post')
// const Book = require('../models/Book');
const withAuth = require('../utils/auth')

router.get('/', (req, res) => {
  try {
    const postData = await Post.findAll({});
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

module.exports = router