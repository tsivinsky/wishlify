// Require dependencies
const router = require("express").Router();
const Wishlist = require("../models/Wishlist");

// GET route for getting wishlist by id
router.get("/:wishlistID", async (req, res) => {
  const { wishlistID } = req.params;

  // Find wishlist by id
  const wishlist = await Wishlist.findById(wishlistID);

  res.json({ status: 200, message: "Wishlist found", data: wishlist });
});

// POST route for creating new wishlists
router.post("/", async (req, res) => {
  const { name, description, owner } = req.body;

  // Check for empty values
  if (!name || !owner) {
    return res.json({ status: 400, message: "Empty value", data: {} });
  }

  // Create a new wishlist
  const wishlist = new Wishlist({
    name,
    description,
    owner,
  });

  wishlist
    .save()
    .then((wishlist) =>
      res.json({ status: 201, message: "Wishlist created", data: wishlist })
    );
});

// Export router
module.exports = router;
