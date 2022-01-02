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
      await post.updateOne({ $set: req.body });
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
// get a post
// get timeline posts

module.exports = router;
