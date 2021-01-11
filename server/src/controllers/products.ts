import express, { IRouter, Request, Response } from "express";
import { Product, Wishlist } from "../models";
import { getProductData } from "../helpers";

const router: IRouter = express.Router();

// POST route for adding new products to wishlist
router.post("/", async (req: Request, res: Response) => {
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
    product = await Product.create(productData);
  }

  // Save new product in database
  const savedProduct = await product.save();

  // Add product's id in wishlist
  wishlist.products.push(savedProduct._id);

  // Update wishlist
  await wishlist.save();

  return res.status(201).json(savedProduct);
});

export default router;
