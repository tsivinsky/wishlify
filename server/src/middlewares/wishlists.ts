import { Request, Response, NextFunction } from "express";
import { Wishlist } from "../models";

// Middleware for checking if wishlist does not exist
export async function wishlistsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { _id: owner } = req.user;
  const { displayName } = req.params;

  if (displayName) {
    // Find wishlist by displayName prop
    const wishlist = await Wishlist.findOne({ displayName, owner });

    if (!wishlist) {
      return res.status(404).send("Wishlist not found");
    }
  }

  return next();
}
