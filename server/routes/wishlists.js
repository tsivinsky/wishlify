// Require dependencies
const router = require("express").Router();
const Wishlist = require("../models/Wishlist");

// GET route for getting wishlist by id
router.get("/:wishlistID", async (req, res) => {
  const { wishlistID } = req.params;

  // Find wishlist by id
  const wishlist = await Wishlist.findById(wishlistID)
    .populate("products")
    .populate("users");

  res.status(200).json(wishlist);
});

// POST route for creating new wishlists
router.post("/", async (req, res) => {
  const { name, description, owner } = req.body;

  // Check for empty values
  if (!name || !owner) {
    return res.status(400).send("Empty value");
  }

  // Create a new wishlist
  const wishlist = new Wishlist({
    name,
    description,
    owner,
  });

  // Save new wishlist in database
  const savedWishlist = (await wishlist.save())
    .populate("products")
    .populate("users");

  res.status(201).json(savedWishlist);
});

// PATCH route for updating wishlist
router.patch("/:wishlistID", async (req, res) => {
  const { wishlistID } = req.params;
  const { name, description } = req.body;

  // Check for empty body
  if (!name && !description) {
    return res.status(400).send("Empty value");
  }

  // Find wishlist by id
  const wishlist = await Wishlist.findById(wishlistID);

  // Update name
  if (name) {
    wishlist.name = name;
  }

  // Update description
  if (description) {
    wishlist.description = description;
  }

  // Update wishlist in database
  const updatedWishlist = (await wishlist.save())
    .populate("products")
    .populate("users");

  res.status(200).json(updatedWishlist);
});

// DELETE route for deleting wishlist
router.delete("/:wishlistID", async (req, res) => {
  const { wishlistID } = req.params;

  // Find wishlist by id
  const wishlist = await Wishlist.findByIdAndDelete(wishlistID)
    .populate("products")
    .populate("users");

  res.status(200).json(wishlist);
});

// DELETE route for removing products from wishlist
router.delete("/:wishlistID/products/:productID", async (req, res) => {
  const { wishlistID, productID } = req.params;

  // Find wishlist by id
  const wishlist = await Wishlist.findById(wishlistID);

  // Remove product from wishlist
  wishlist.products = wishlist.products.filter(
    (id) => String(id) !== productID
  );

  // Update wishlist in database
  const updatedWishlist = (await wishlist.save())
    .populate("products")
    .populate("users");

  res.status(200).json(updatedWishlist);
});

// Export router
module.exports = router;
