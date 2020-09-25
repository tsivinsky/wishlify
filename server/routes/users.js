// Require dependencies
const router = require("express").Router();
const { default: validator } = require("validator");
const User = require("../models/User");
const Wishlist = require("../models/Wishlist");

// GET route for getting user's data
router.get("/:userID", async (req, res) => {
  const { userID } = req.params;

  // Find user by id
  const user = await User.findById(userID);

  res.json({ status: 200, message: "User found", data: user });
});

// PATCH route for editing user's name
router.patch("/:userID/name", async (req, res) => {
  const { userID } = req.params;
  const { name } = req.body;

  // Check for empty value
  if (!name) {
    return res.json({ status: 400, message: "Empty value", data: {} });
  }

  // Find user by id
  const user = await User.findById(userID);

  // Update user's name
  user.name = name;

  user
    .save()
    .then((user) =>
      res.json({ status: 200, message: "User updated", data: user })
    );
});

// PATCH route for editing user's email
router.patch("/:userID/email", async (req, res) => {
  const { userID } = req.params;
  const { email } = req.body;

  // Check for empty value
  if (!email) {
    return res.json({ status: 400, message: "Empty value", data: {} });
  }

  // Check if email is invalid
  if (!validator.isEmail(email)) {
    return res.json({ status: 400, message: "Invalid email", data: {} });
  }

  // Check if this email already registered
  const emailTaken = await User.findOne({ email });
  if (emailTaken) {
    return res.json({
      status: 400,
      message: "This email already registered",
      data: {},
    });
  }

  // Find user by id
  const user = await User.findById(userID);

  // Update email
  user.email = email;

  user
    .save()
    .then((user) =>
      res.json({ status: 200, message: "User updated", data: user })
    );
});

// GET route for getting all user's wishlists
router.get("/:userID/wishlists", async (req, res) => {
  const { userID } = req.params;

  // Find all wishlists by owner property
  const wishlists = await Wishlist.find({ owner: userID });

  res.json({ status: 200, message: "Wishlists found", data: wishlists });
});

// Export router
module.exports = router;
