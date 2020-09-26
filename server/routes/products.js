// Require dependencies
const router = require("express").Router();
const Wishlist = require("../models/Wishlist");
const { getProductData } = require("../util/products");

// POST route for adding new products to wishlist
router.post("/:wishlistID/products", async (req, res) => {
  const { wishlistID } = req.params;
  const { url } = req.body;

  // Check for empty value
  if (!url) {
    return res.json({ status: 400, message: "Empty value", data: {} });
  }

  // Find wishlist by id
  const wishlist = await Wishlist.findById(wishlistID);

  const product = await getProductData(url);

  // Add product's data to wishlist
  wishlist.products.push(product);

  wishlist
    .save()
    .then((wishlist) =>
      res.json({ status: 201, message: "Product added", data: wishlist })
    );
});

// DELETE route for deleting product
router.delete("/:wishlistID/products/:productID", async (req, res) => {
  const { wishlistID, productID } = req.params;

  // Find wishlist by id
  const wishlist = await Wishlist.findById(wishlistID);

  // Find product in wishlist and delete it
  wishlist.products = wishlist.products
    .map((product) => (product._id == productID ? null : product))
    .filter((x) => x);

  wishlist
    .save()
    .then((wishlist) =>
      res.json({ status: 200, message: "Product deleted", data: wishlist })
    );
});

// Export router
module.exports = router;
