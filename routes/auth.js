const router = require("express").Router();
const User = require("../models/User");

//Register
router.get("/register", async (req, res) => {
  const user = new User({
    username: "Mayur",
    email: "mayurpokharkar@gmail.com",
    password: "123",
  });
  await user.save();

  res.send("Ok!");
});

module.exports = router;
