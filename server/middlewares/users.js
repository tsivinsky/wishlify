// Require dependencies
const router = require("express").Router();
const User = require("../models/User");

// Middleware for checking if user does not exist
router.use("/:userID", async (req, res, next) => {
  const { userID } = req.params;

  // Find user by id
  const user = await User.findById(userID);

  if (!user) {
    return res.status(404).send("User not found");
  }

  next();
});

// Export router
module.exports = router;
