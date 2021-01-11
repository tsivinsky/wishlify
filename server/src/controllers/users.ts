import { Request, Response } from "express";
import { User, Wishlist } from "../models";

// Get user controller
export async function getUser(req: Request, res: Response) {
  const { userID } = req.params;

  // Find user by id
  const user = await User.findById(userID);

  return res.status(200).json(user);
}

// Update user controller
export async function updateUser(req: Request, res: Response) {
  const { userID } = req.params;
  const { name, email } = req.body;

  // Check for empty values
  if (!name || !email) {
    return res.status(400).send("Empty value");
  }

  // Find user by id
  const user = await User.findById(userID);

  // Update name
  if (name) {
    user.name = name;
  }

  // Update email
  if (email) {
    // Check if this email already exists in database
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).send("This email already registered");
    }

    user.email = email;
  }

  // Update user in database
  const updatedUser = await user.save();

  return res.status(200).json(updatedUser);
}

// Get user wishlists controller
export async function getUserWishlists(req: Request, res: Response) {
  const { userID } = req.params;

  // Find all wishlists by owner property
  const wishlists = await Wishlist.find({
    owner: userID,
  }).populate("products");

  return res.status(200).json(wishlists);
}
