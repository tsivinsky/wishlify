import { Request, Response } from "express";
import { Wishlist } from "../models";

// Get wishlist controller
export async function getWishlist(req: Request, res: Response) {
  const { wishlistID } = req.params;

  // Find wishlist by id
  const wishlist = await Wishlist.findById(wishlistID)
    .populate("products")
    .populate("users");

  res.status(200).json(wishlist);
}

// Create wishlist controller
export async function createWishlist(req: Request, res: Response) {
  const { name, description, owner } = req.body;

  // Check for empty values
  if (!name || !owner) {
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
  const savedWishlist = (await wishlist.save())
    .populate("products")
    .populate("users");

  return res.status(201).json(savedWishlist);
}

// Update wishlist controller
export async function updateWishlist(req: Request, res: Response) {
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

  return res.status(200).json(updatedWishlist);
}

// Delete wishlist controller
export async function deleteWishlist(req: Request, res: Response) {
  const { wishlistID } = req.params;

  // Find wishlist by id
  const wishlist = await Wishlist.findByIdAndDelete(wishlistID)
    .populate("products")
    .populate("users");

  return res.status(200).json(wishlist);
}

// Remove product in wishlist controller
export async function removeProductFromWishlist(req: Request, res: Response) {
  const { wishlistID, productID } = req.params;

  // Find wishlist by id
  const wishlist = await Wishlist.findById(wishlistID);

  // Remove product from wishlist
  // wishlist.products = wishlist.products.filter(
  //   (id: string) => String(id) !== productID
  // );
  for (const [id, i] of Object.entries(wishlist.products)) {
    if (String(id) === productID) {
      wishlist.products.slice(Number(i), 1);
    }
  }

  // Update wishlist in database
  const updatedWishlist = (await wishlist.save())
    .populate("products")
    .populate("users");

  return res.status(200).json(updatedWishlist);
}
