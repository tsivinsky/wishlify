// Require dependencies
const router = require("express").Router();
const User = require("../models/User");
const validator = require("validator");
const { hashPassword, comparePasswords } = require("../util/password");

// POST route for register new users
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Check for empty values
  if (!name || !email || !password) {
    return res.json({ status: 400, message: "Empty value", data: {} });
  }

  // Check if email is invalid
  if (!validator.isEmail(email)) {
    return res.json({ status: 400, message: "Invalid email", data: {} });
  }

  // Check if user with this email already registered
  const emailTaken = await User.findOne({ email });
  if (emailTaken) {
    return res.json({
      status: 400,
      message: "Email already registered",
      data: {},
    });
  }

  // Create a new user
  const user = new User({
    name,
    email,
    password,
  });

  // Hash user's password
  user.password = hashPassword(user.password);

  user
    .save()
    .then((user) =>
      res.json({ status: 201, message: "User registered", data: user })
    );
});

// POST route for authenticate existing users
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check for empty values
  if (!email || !password) {
    return res.json({ status: 400, message: "Empty value", data: {} });
  }

  // Check if email is invalid
  if (!validator.isEmail(email)) {
    return res.json({ status: 400, message: "Invalid email", data: {} });
  }

  // Check if this email does not registered
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ status: 400, message: "Email does not exist", data: {} });
  }

  res.json({ status: 200, message: "User authorized", data: user });
});

// Export router
module.exports = router;
