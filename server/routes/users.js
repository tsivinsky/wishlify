// Require dependencies
const router = require("express").Router();
const validator = require("validator");
const User = require("../models/User");
const Wishlist = require("../models/Wishlist");

// GET route for getting user's data
router.get("/:userID", async (req, res) => {
  const { userID } = req.params;

  // Find user by id
  const user = await User.findById(userID);

  res.status(200).json(user);
});

// PATCH route for updating user's data
router.patch("/:userID", async (req, res) => {
  const { userID } = req.params;
  const { name, email } = req.body;

  // Check req.body keys' length
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send("Empty value");
  }

  // Find user by id
  const user = await User.findById(userID);

  // Update name
  if (name) {
    user.name = name;
  }

  // Update email
  if (email) {
    // Check if this email already exists in database
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).send("This email already registered");
    }

    user.email = email;
  }

  // Update user in database
  const updatedUser = await user.save();

  res.status(200).json(updatedUser);
});

// GET route for getting all user's wishlists
router.get("/:userID/wishlists", async (req, res) => {
  const { userID } = req.params;

  // Find all wishlists by owner property
  const wishlists = await Wishlist.find({ owner: userID }).populate("products");

  res.status(200).json(wishlists);
});

// Export router
module.exports = router;
