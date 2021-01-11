import { Request, Response } from "express";
import { Wishlist } from "../models";

// Get authorized user controller
export function getUser(req: Request, res: Response) {
  const { user } = req;

  res.json(user);
}

// Get wishlists of authorized user controller
export async function getUserWishlists(req: Request, res: Response) {
  const { user } = req;

  // Find wishlists by owner prop
  const wishlists = await Wishlist.find({ owner: user._id });

  return res.status(200).json(wishlists);
}

// Create new wishlists for authorized user controller
export async function createWishlist(req: Request, res: Response) {
  const { user } = req;
  const { name, description } = req.body;

  // Check for empty values
  if (!name) {
    return res.status(400).send("Empty value");
  }

  // Create new wishlist
  const wishlist = await Wishlist.create({
    name,
    description,
    owner: user._id,
  });

  // Save wishlist in database
  const savedWishlist = await wishlist.save();

  return res.status(201).json(savedWishlist);
}

// Get user's wishlist by displayName prop controller
export async function getWishlistByDisplayName(req: Request, res: Response) {
  const { user } = req;
  const { displayName } = req.params;

  // Find wishlist by displayName
  const wishlist = await Wishlist.findOne({ displayName, owner: user._id });

  // TODO: Turn this into a separated middleware function
  if (!wishlist) {
    return res.status(404).send("Wishlist does not found");
  }

  return res.status(200).json(wishlist);
}
