const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { rawListeners } = require("../models/User");

// Update a user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    // If the use want to update password
    if (req.body.password) {
      try {
        // Generate a new password
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Details updated!!");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res
      .status(403)
      .json("Cannot update info. You can only update you account!!.");
  }
});

// Delete a user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account deleted successfully!!");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res
      .status(403)
      .json("Cannot delete info. You can only delete you account!!.");
  }
});

// Get a user

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      // We will check that if the current user already follow the user.
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({
          $push: { followers: req.body.userId },
        });
        await currentUser.updateOne({
          $push: { followings: req.params.id },
        });
        res.status(200).json("User followed!!");
      } else {
        // Already follow the user
        res.status(403).json("User followed!!");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("Cannot follow yourself!!");
  }
});

// Unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      // We will check that if the current user follows the user or not.
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({
          $pull: { followers: req.body.userId },
        });
        await currentUser.updateOne({
          $pull: { followings: req.params.id },
        });
        res.status(200).json("User unfollowed!!");
      } else {
        // Already follow the user
        res.status(403).json("User unfollowed!!");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("Cannot unfollow yourself!!");
  }
});

module.exports = router;
