// Require dependencies
const router = require("express").Router();
const Wishlist = require("../models/Wishlist");

// Middleware for checking if wishlist does not exist
router.use("/:wishlistID", async (req, res, next) => {
  const { wishlistID } = req.params;

  // Find wishlist by id
  const wishlist = await Wishlist.findById(wishlistID);

  if (!wishlist) {
    return res.json({ status: 404, message: "Wishlist not found", data: {} });
  }

  next();
});

// Export router
module.exports = router;
