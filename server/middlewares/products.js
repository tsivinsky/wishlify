// Require dependencies
const router = require("express").Router();
const Product = require("../models/Product");

// Middleware for checking if product does not exist
router.use("/:productID", async (req, res, next) => {
  const { productID } = req.params;

  // Find product by id
  const product = await Product.findById(productID);

  if (!product) {
    return res.status(404).send("Product not found");
  }

  next();
});

// Export router
module.exports = router;
