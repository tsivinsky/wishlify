import { Request, Response, NextFunction } from "express";
import { Wishlist } from "../models";

// Middleware for checking if wishlist does not exist
export async function wishlistsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { wishlistID } = req.params;

  // Find wishlist by id
  const wishlist = await Wishlist.findById(wishlistID);

  if (!wishlist) {
    return res.status(404).send("Wishlist not found");
  }

  return next();
}
