import { Request, Response } from "express";
import { Wishlist, Product } from "../models";
import { getProductData } from "../helpers";

// Get user's wishlists controller
export async function getUserWishlists(req: Request, res: Response) {
  const { _id: owner } = req.user;

  // Find all user's wishlists
  const wishlists = await Wishlist.find({ owner });

  res.status(200).json(wishlists);
}

// Create wishlist controller
export async function createWishlist(req: Request, res: Response) {
  const { _id: owner } = req.user;
  const { name, description } = req.body;

  // Check for empty values
  if (!name) {
    return res.status(400).send("Empty value");
  }

  // Create a new wishlist
  const wishlist = await Wishlist.create({
    name,
    description,
    owner,
    products: [],
  });

  // Save new wishlist in database
  const savedWishlist = await wishlist.save();

  return res.status(201).json(savedWishlist);
}

// Get wishlist controller
export async function getWishlist(req: Request, res: Response) {
  const { _id: owner } = req.user;
  const { displayName } = req.params;

  // Find wishlist by displayName prop
  const wishlist = await Wishlist.findOne({ displayName, owner });

  res.status(200).json(wishlist);
}

// Update wishlist controller
export async function updateWishlist(req: Request, res: Response) {
  const { _id: owner } = req.user;
  const { displayName } = req.params;
  const { name, description } = req.body;

  // Check for empty body
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send("Empty value");
  }

  // Find wishlist by displayName prop
  const wishlist = await Wishlist.findOne({ displayName, owner });

  // Update name
  if (name) {
    wishlist.name = name;
  }

  // Update description
  if (description) {
    wishlist.description = description;
  }

  // Update wishlist in database
  const updatedWishlist = await wishlist.save();

  return res.status(200).json(updatedWishlist);
}

// Delete wishlist controller
export async function deleteWishlist(req: Request, res: Response) {
  const { _id: owner } = req.user;
  const { displayName } = req.params;

  // Find wishlist by displayName prop
  const wishlist = await Wishlist.findOneAndDelete({ displayName, owner });

  return res.status(200).json(wishlist);
}

export async function addProduct(req: Request, res: Response) {
  const { _id: owner } = req.user;
  const { displayName } = req.params;
  const { url } = req.body;

  // Check for empty values
  if (!url) {
    return res.status(400).send("Empty value");
  }

  // Find wishlist by displayName prop
  const wishlist = await Wishlist.findOne({ displayName, owner });

  // Check if this product already exists in this wishlist
  const productIndex = wishlist.products.findIndex((p) => p.url === url);
  if (productIndex !== -1) {
    return res
      .status(400)
      .send("You already have this product in this wishlist");
  }

  // Check if product with the same url already exists in database
  let product = await Product.findOne({ url });
  if (!product) {
    const productData = await getProductData(url);

    product = await Product.create(productData);
  }

  const savedProduct = await product.save();

  wishlist.products.push(savedProduct._id);

  const updatedWishlist = await wishlist.save();

  return res.status(201).json(updatedWishlist);
}

// Remove product in wishlist controller
export async function removeProduct(req: Request, res: Response) {
  const { _id: owner } = req.user;
  const { displayName, productID } = req.params;

  // Find wishlist by displayName prop
  const wishlist = await Wishlist.findOne({ displayName, owner });

  // Find product index in wishlist
  const productIndex = wishlist.products.findIndex((p) => p._id == productID);

  if (productIndex === -1) {
    return res.status(400).send("Product not found");
  }

  // Remove product from wishlist
  wishlist.products.splice(Number(productIndex), 1);

  // Update wishlist in database
  const updatedWishlist = await wishlist.save();

  return res.status(200).json(updatedWishlist);
}
