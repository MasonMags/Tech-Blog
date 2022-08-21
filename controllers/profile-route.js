const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const withAuth = require('../utils/auth.js');

// router.get('/', withAuth, async (req, res) => {
//    try {
//    const postData = await Post.findAll({
//         where: {
//             user_id: req.session.user_id
//         },
//         attributes: [
//             'id',
//             'title',
//             'post_text',
//             'created_at'
//         ],
//         include: [
//             {
//                 model: Comment,
//                 attributes:  ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//                 include: {
//                     model: User,
//                     attributes: ['username']
//                   }
//             },
//             {
//                 model: User,
//                 attributes: ['username']
//               }
//         ]
//     })
//     const posts = postData.get({ plain: true })
//     res.render('profile', {posts, logged_in: true })
// } 
// catch (err) {
//     console.log(err)
//     res.status(500).json(err)
//   }  
// });

router.get('/', withAuth, (req, res) => {
    Post.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes: [
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
      .then(dbPostData => {
        // serialize data before passing to template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('profile', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.get('/edit/:id', withAuth, async (req, res) =>{
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
    const editPost = postData.get({ plain: true })
    res.render('edit-post', { editPost, loggedIn: req.session.loggedIn});
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
  });

  router.get('/newpost', withAuth, (req, res) => {
    res.render('new-posts');
  });
  
  module.exports = router;