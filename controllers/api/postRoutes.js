const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require("../../utils/auth");

// see 13-06 for examples of creating/getting objects
// GET all posts
router.get("/", async (req, res) => {
  try {
    const allPosts = await Blog.findAll({
      attributes: ["id", "title", "content"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: [
            "id",
            "comments_content",
            "post_id",
            "user_id",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });
    res.status(200).json(allPosts);

  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const  postDB = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "content", "title"],
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
            attributes: ["username"],
          },
        },
      ],
    });
    res.status(200).json(postDB);

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
router.delete('/:id', withAuth, async (req, res) => {
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

// Update a post
router.put('/:id', withAuth,async (req, res) => {
  try {
      await Post.update(req.body, {
          where: {
              id: req.params.id
          },
      });
      res.status(200).json("Post Updated")
  } catch (err) {
      res.status(400).json(err)
  }
});

module.exports = router;
