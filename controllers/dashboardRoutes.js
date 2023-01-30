const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

// GET all user's Posts for Dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
      const postData = await Post.findAll({
        // filter out only user's posts
        where: { user_id: req.session.user_id},
        attributes: [
          'id',
          'title',
          'content',
          'date_created'
        ],
        include: [{
          model: Comment,
            attributes: [
              'id',
              'comment_content',
              'post_id',
              'user_id',
              'date_created'],
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
  
      const posts = postData.map((post) => post.get({ plain: true }));
  
      res.render('dashboard', {
        posts,
        username: req.session.username,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// GET one of User's post
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    const post = postData.get({ plain: true });

    res.render('painting', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;