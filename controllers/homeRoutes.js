const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const sequelize = require('../config/connection');
// const withAuth = require('../utils/auth');
// const  format_date = require('../utils/helpers')

// GET all Posts for homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: [
        'id',
        'title',
        'content',
        'date_created'
      ],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: [
            "id",
            "comment_content",
            "post_id",
            "user_id",
          ],
          include: {
            model: User,
            attributes: [
              "username",
            ],
          },
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: [
        'id',
        'title',
        'date-created',
        'post_text'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'date-created'],
          include: {
            model: User,
            attributes: ['name']
          }
        },
        {
          model: User,
          attributes: ['name']
        }
      ]
    })

    const post = postData.get({ plain: true });
    console.log(post);

    res.render('post', {
        ...post,
        logged_in: req.session.logged_in
    });
} catch (err) {
    res.status(500).json(err);
  }
});

// Login Route
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// create a user - 13-11
// router.post('/', async (req, res) => {
//   try {
//     const userData = await User.create(req.body);
//     // 200 status code means the request is successful
//     res.status(200).json(userData);
//   } catch (err) {
//     // 400 status code means the server could not understand the request
//     res.status(400).json(err);
//   }
// });


module.exports = router;
