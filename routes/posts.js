const router = require("express").Router();
const Post = require("../models/Post");

// router.get("/", (req, res) => {});

// create a post

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a post
router.put("/:id", async (req, res) => {
  try {
    // Get the post by using post ID
    const post = await Post.findById(req.params.id);

    // Check if the user updating the post is author/owner of the post
    if (post.userId == req.body.userId) {
      await post.updateOne({
        $set: req.body,
      });
      res.status(200).json("Post successfully updated!");
    } else {
      res.status(404).json("You can't update the post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a post
router.delete("/:id", async (req, res) => {
  try {
    // Get the post by using post ID
    const post = await Post.findById(req.params.id);

    // Check if the user updating the post is author/owner of the post
    if (post.userId == req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted successfully!");
    } else {
      res.status(404).json("You can't delete the post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// like a post
router.put("/:id/like", async (req, res) => {
  try {
    // Find the post
    const post = await Post.findById(req.params.id);

    // Check whether the post is already liked by the current user.
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      // Success Message
      res.status(200).send("Post Liked!");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).send("Post Disliked!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// get a post
router.get("/:id", async (req, res) => {
  try {
  } catch (err) {}
});

// get timeline posts

module.exports = router;
