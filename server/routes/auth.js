// Require dependencies
const router = require("express").Router();
const User = require("../models/User");
const validator = require("validator");

// POST route for register new users
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Check for empty values
  if (!name || !email || !password) {
    return res.status(400).send("Empty value");
  }

  // Check if password length less than 8 symbols
  if (password.length < 8) {
    return res
      .status(400)
      .send("Password length shoudn`t be less than 8 symbols");
  }

  // Check if email is invalid
  if (!validator.isEmail(email)) {
    return res.status(400).send("Invalid email");
  }

  // Check if user with this email already registered
  const emailTaken = await User.findOne({ email });
  if (emailTaken) {
    return res.status(400).send("Email already registered");
  }

  // Create a new user
  const user = new User({
    name,
    email,
    password,
  });

  // Hash user's password
  user.hashPassword();

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

// POST route for authenticate existing users
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check for empty values
  if (!email || !password) {
    return res.status(400).send("Empty value");
  }

  // Check if email is invalid
  if (!validator.isEmail(email)) {
    return res.status(400).send("Invalid email");
  }

  // Check if this email does not registered
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("Email does not exist");
  }

  // Check if password is invalid
  const isMatch = user.checkPassword(password);
  if (!isMatch) {
    return res.status(400).send("Invalid password");
  }

  res.status(200).json(user);
});

// Export router
module.exports = router;
