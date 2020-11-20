// Require dependencies
const router = require("express").Router();
const Product = require("../models/Product");
const Wishlist = require("../models/Wishlist");
const getProductData = require("../util/getProductData");

// POST route for adding new products to wishlist
router.post("/", async (req, res) => {
  const { url, wishlistID } = req.body;

  // Check for empty value
  if (!url || !wishlistID) {
    return res.status(400).send("Empty value");
  }

  // Find wishlist by id
  const wishlist = await Wishlist.findById(wishlistID);

  // Check if product with the same url already exists in database
  let product = await Product.findOne({ url });
  if (!product) {
    // Get product data by url
    const productData = await getProductData(url);

    // Create new product
    product = new Product(productData);
  }

  // Save new product in database
  const savedProduct = await product.save();

  // Add product's id in wishlist
  wishlist.products.push(savedProduct._id);

  // Update wishlist
  await wishlist.save();

  res.status(201).json(savedProduct);
});

// Export router
module.exports = router;
