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
})
