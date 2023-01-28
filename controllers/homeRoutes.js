const router = require('express').Router();
const { User, Post } = require('../models');
//const withAuth = require('../utils/auth');

// TODO: Add a comment describing the functionality of the withAuth middleware
router.get('/', async (req, res) => {
  try {
    const postData = await Project.findAll({});

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
