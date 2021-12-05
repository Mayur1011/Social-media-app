const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hey this user Route.");
});

module.exports = router;
