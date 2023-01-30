const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require("../../utils/auth");

// see 13-06 for examples of creating/getting objects
// GET all posts 
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        id: req.params.id,
      },
      attributes: [
        "id",
        "content",
        "title",
        "date_created"
      ],
      include: [
        {
        model: User,
        attributes:["username"]
        },
        {
        model: Comment,
        attributes: [
          'id',
          'comment_content',
          'post_id',
          'user_id',
          'date_created'],
        },
      ]
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// GET a single post
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      where: {
        id: req.params.id,
      },
      attributes: [
        "id",
        "content",
        "title",
        "date_created"
      ],
      include: [
        {
        model: User,
        attributes:["username"]
        },
        {
        model: Comment,
        attributes: [
          'id',
          'comment_content',
          'post_id',
          'user_id',
          'date_created'],
        },
      ]
    });
    res.status(200).json(postData);

    } catch (err) {
      res.status(400).json(err);
    }
  });

// CREATE a post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a post
router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
