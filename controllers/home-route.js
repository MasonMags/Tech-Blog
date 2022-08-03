const router = require('express').Router();
// const User = require('../models/User')
// const Book = require('../models/Book');
const withAuth = require('../utils/auth')

router.get('/', (req, res) => {
  res.render('homepage');
});

module.exports = router